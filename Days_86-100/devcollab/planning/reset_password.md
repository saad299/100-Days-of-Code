# Forgot Password / Reset Password Feature

This document explains the architecture, engineering approach, and working flow of the **Forgot Password / Reset Password** feature for a project with a **Next.js frontend** and **Django backend**, using **Brevo** as the email service provider. No code is included here — this is a conceptual and planning reference.

---

## 1. What This Feature Does

Allows a user who forgot their password to securely regain access to their account without needing to contact support, by:

1. Requesting a reset via their registered email
2. Receiving a time-limited, single-use link
3. Setting a new password through that link

---

## 2. High-Level Architecture

```
┌─────────────────┐        ┌──────────────────┐        ┌─────────────────┐        ┌──────────────┐
│                  │  (1)   │                   │  (2)   │                 │  (3)   │              │
│  Next.js         │ ─────► │  Django Backend   │ ─────► │  Brevo API /    │ ─────► │  User's      │
│  Frontend        │        │  (REST API)       │        │  SMTP Relay     │        │  Inbox       │
│                  │ ◄───── │                   │        │                 │        │              │
└─────────────────┘  (5)   └──────────────────┘                                    └──────┬───────┘
        ▲                          │                                                       │
        │                          │ (4) validates                                         │
        │                          ▼                                                       │
        │                  ┌──────────────────┐                                            │
        │                  │  Database         │                                            │
        │                  │  (User table +    │                                            │
        │                  │  token state)     │                                            │
        │                  └──────────────────┘                                            │
        │                                                                                    │
        └───────────────────── (6) User clicks reset link, opens Next.js page ◄─────────────┘
```

**Legend:**
1. User submits "forgot password" form → Django API
2. Django asks Brevo to send the reset email
3. Brevo delivers the email to the user's inbox
4. Django checks/generates token state against the database
5. Django responds to Next.js with a generic confirmation message
6. User clicks the link in their email, which opens a Next.js page to set a new password

---

## 3. End-to-End Flow (Step by Step)

### Step 1 — User Requests a Reset
- User visits a **"Forgot Password"** page on the Next.js frontend
- Enters their registered email address and submits
- Frontend sends this to a Django API endpoint (e.g., a "request reset" endpoint)

### Step 2 — Django Generates a Secure Token
- Django looks up the user by email
- If found, it generates a **secure, random, single-use token** tied to that specific user
- This token is combined with the user's unique ID to form a reset link
- Django does **not** reveal whether the email exists or not — it always responds the same way, to prevent attackers from discovering which emails are registered (this is called **account enumeration protection**)

### Step 3 — Django Sends the Email via Brevo
- Django hands off the email-sending job to Brevo, using either:
  - **SMTP relay** (Brevo acts like a regular email server Django connects to), or
  - **Brevo's REST API** (Django makes an HTTP request to Brevo with the email content)
- The email contains a link back to the frontend, with the token embedded in the URL
- Brevo handles actual delivery, spam-filtering compliance, and deliverability

### Step 4 — User Clicks the Link
- The link opens a **"Reset Password"** page on the Next.js frontend
- The frontend reads the token and user identifier from the URL

### Step 5 — User Submits a New Password
- User enters and confirms a new password on this page
- Frontend sends the new password along with the token/user identifier back to Django

### Step 6 — Django Validates and Updates
- Django checks:
  - Does the token match this user?
  - Has the token expired?
  - Has the token already been used?
- If everything checks out, the password is updated (and securely hashed)
- The token is **invalidated** immediately after use, so it cannot be reused

### Step 7 — Confirmation
- Django responds with a success message
- Next.js redirects the user to the login page, typically with a "Password updated successfully" message

---

## 4. Token Design — Options

| Approach | Description | Recommended? |
|---|---|---|
| **Django's built-in token generator** | Uses Django's internal mechanism that derives a token from the user's current password hash, ID, and a timestamp — no separate database table needed. Automatically becomes invalid once the password is changed. | ✅ Recommended — simplest, secure, well-tested |
| **Custom token stored in database** | You create your own table to store generated tokens, their expiry, and "used" status manually. | Optional — only needed if you want more control (e.g., tracking reset history, multiple simultaneous tokens, custom expiry logic per user) |
| **JWT (JSON Web Token) as reset token** | Encodes user ID + expiry inside a signed token, without needing database lookups to validate expiry. | Optional — useful in larger, distributed systems, but adds complexity that isn't needed for most projects |

**Recommendation:** Start with Django's built-in token generator. It's secure, requires no extra database schema, and automatically invalidates itself once the password changes. Move to a custom/database-backed token system only if you need extra features later (e.g., showing users a history of reset requests).

---

## 5. Email Delivery Method — Options

| Method | Description | Recommended? |
|---|---|---|
| **SMTP Relay via Brevo** | Django is configured to send emails through Brevo's SMTP server, similar to how it would with Gmail or any other SMTP provider. | ✅ Recommended for simplicity — works with Django's built-in email sending, minimal setup |
| **Brevo REST API** | Django communicates with Brevo over HTTP, sending structured requests instead of using SMTP protocol. | Optional — gives more detailed control (e.g., using Brevo's dynamic email templates, tracking opens/clicks) but requires slightly more setup |

**Recommendation:** Use SMTP relay to start. It integrates directly with Django's existing email framework. Switch to the REST API later only if you want features like open/click tracking, dynamic templates managed inside Brevo's dashboard, or more detailed delivery logs.

---

## 6. Security Considerations

- **Token expiry** — Reset links should expire after a short window (commonly 15 minutes to 1 hour). Django allows this to be configured; the default is longer (3 days), which is too generous for a password reset link and should be shortened.
- **Single-use tokens** — Once a token is used to reset a password, it must become invalid immediately, so the same email link can't be reused.
- **No account enumeration** — The "forgot password" response should always look the same, whether or not the email exists in the system, so attackers can't use it to discover registered users.
- **HTTPS only** — The reset link must only ever be sent over HTTPS. If it's intercepted over plain HTTP, the token could be captured and reused by an attacker.
- **Sender authentication (SPF/DKIM)** — Brevo requires verifying your sending domain, which helps prevent your reset emails from landing in spam folders and also prevents others from spoofing emails "from" your domain.
- **Rate limiting** — Explained in detail below.

---

## 7. Rate Limiting — Why It Matters

### What Is It?

Rate limiting means restricting how many times a particular action (like requesting a password reset) can be performed within a certain time window — for example, allowing only 3 reset requests per email address, or per IP address, every 15 minutes.

### Why You Should Add It

Without rate limiting, the "forgot password" endpoint is an open door for abuse:

- **Email bombing / spam abuse** — Someone could repeatedly submit a victim's email address to the reset endpoint, causing that person to be flooded with reset emails — annoying at best, and potentially used as a distraction technique alongside other attacks at worst.
- **Brevo quota exhaustion** — Since your Brevo free plan has a daily sending cap (300 emails/day), an attacker spamming the reset endpoint could burn through your entire daily quota very quickly, breaking the feature for real users.
- **Account enumeration attempts** — Even with generic responses, an attacker sending large volumes of requests with different email addresses and analyzing subtle differences (response timing, etc.) could attempt to guess which emails exist in your system. Rate limiting slows this down significantly.
- **Server load** — Every reset request involves a database lookup and an outbound API/SMTP call, both of which have a cost. Uncontrolled requests can strain your backend unnecessarily.

### How It's Typically Implemented (Conceptually)

Rate limiting is usually applied to the "request reset" endpoint (not the "confirm new password" endpoint, though both can be protected). Two common approaches:

**By IP Address**
- Limits how many reset requests can come from a single IP address within a time window
- Prevents a single attacker/script from flooding your system
- Downside: Multiple legitimate users on the same network (office, shared Wi-Fi) could be restricted together

**By Email Address**
- Limits how many reset requests can target a single email address within a time window
- Prevents a specific person's inbox from being flooded, regardless of who's making the requests or from where
- This is usually the more important protection to have

**Best Practice:** Apply both — limit by IP *and* by email address, since they protect against different abuse patterns.

### Where This Fits in the Architecture

```
User submits email
        │
        ▼
┌─────────────────────────┐
│  Rate Limit Check        │
│  - Has this IP or email  │
│    exceeded allowed      │
│    requests recently?    │
└─────────┬────────────────┘
          │
   ┌──────┴───────┐
   │              │
  Yes            No
   │              │
   ▼              ▼
Reject with    Proceed with
"too many      token generation
attempts"      + email sending
message
```

### Implementation Options (Conceptual, No Code)

| Approach | Description | Recommended? |
|---|---|---|
| **Django REST Framework's built-in throttling** | DRF has a built-in mechanism to limit how many times an endpoint can be hit by a given user or IP within a set time window. Configured through settings, no custom logic needed. | ✅ Recommended — easiest and most maintainable if you're using DRF |
| **Custom logic using cache (e.g., Redis)** | You manually track request counts per email/IP in a fast in-memory store (like Redis) and reject requests once a threshold is hit. | Optional — useful if you need highly custom rules (e.g., different limits for different user tiers) |
| **Third-party middleware/services (e.g., Cloudflare rate limiting, API gateway)** | Rate limiting is handled at the infrastructure level, before requests even reach Django. | Optional — good for larger-scale production systems, but adds infrastructure complexity not needed early on |

**Recommendation:** Use Django REST Framework's built-in throttling to start. It's simple to configure, requires no additional infrastructure, and covers the vast majority of real-world abuse cases for a project at your current stage.

---

## 8. Summary of Recommended Approach

For your current project stage, the recommended combination is:

1. **Token generation:** Django's built-in `PasswordResetTokenGenerator` (no extra database table)
2. **Email delivery:** Brevo via SMTP relay (simplest integration with Django)
3. **Token expiry:** Shortened to around 1 hour instead of Django's 3-day default
4. **Rate limiting:** Django REST Framework's built-in throttling, applied by both IP and email
5. **Security baseline:** Generic responses (no account enumeration), HTTPS-only links, verified sender domain in Brevo (SPF/DKIM)

This gives you a secure, low-maintenance reset flow that fits comfortably within Brevo's free tier (300 emails/day) and doesn't require any extra infrastructure beyond what you already have.

---

## 9. Future Considerations (Not Needed Now)

- Logging out all other active sessions when a password is reset (extra security layer)
- Notifying the user by a separate email if their password was changed, in case it wasn't them
- Moving to Brevo's REST API if you want email open/click tracking or richer HTML templates
- Adding CAPTCHA to the reset request form if rate limiting alone isn't enough to stop abuse
- Storing reset history in the database if you want an audit trail of past reset requests

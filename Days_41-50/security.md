# Backend Security Guide

## What is Backend Security and Why Should We Care?

**Backend security** refers to the practices and measures implemented to protect the server-side components of a web application, including APIs, databases, authentication systems, and business logic. Unlike frontend security, which deals with client-side vulnerabilities, backend security focuses on safeguarding data, preventing unauthorized access, and ensuring the integrity and availability of services.

### Why Care About Backend Security?
- **Data Protection**: Backend handles sensitive data like user credentials, personal information, and financial details. Breaches can lead to identity theft or financial loss.
- **Business Continuity**: Attacks like DDoS can take services offline, causing revenue loss and reputational damage.
- **Compliance**: Regulations like GDPR, HIPAA require robust security.
- **Trust**: Users expect secure applications; vulnerabilities erode trust.
- **Attack Surface**: Backend exposes APIs which are prime targets for exploits like SQL injection, XSS, CSRF.

Common threats: SQL/NoSQL injection, broken authentication, excessive data exposure, etc.

## Rate Limiting

**Rate limiting** restricts the number of requests a client can make to your API within a given time window, preventing abuse, DDoS attacks, and ensuring fair resource usage.

### How it Works
- Tracks requests per IP/user/API key.
- Uses algorithms like Token Bucket, Leaky Bucket, Fixed Window, Sliding Window.
- Returns HTTP 429 (Too Many Requests) when limit exceeded.

### Use Case
Protect login endpoints from brute-force attacks.

### Code Example (Node.js with express-rate-limit)
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window per IP
  message: 'Too many login attempts, try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', loginLimiter);
```

**Explanation**:
- `windowMs`: Time window for counting requests.
- `max`: Max requests allowed.
- Applies only to `/api/auth/login` route.

## CORS (Cross-Origin Resource Sharing)

**CORS** is a browser security feature that restricts web pages from making requests to a different domain than the one serving the page, preventing unauthorized access to resources.

### How it Works
- Server responds with headers like `Access-Control-Allow-Origin`.
- Preflight requests (OPTIONS) check permissions for complex requests.

### Use Case
Allow a React frontend (localhost:3000) to access Node.js API (localhost:5000).

### Code Example (Node.js with cors middleware)
```javascript
const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

**Explanation**:
- `origin`: Whitelist specific domains.
- `credentials: true`: Allows cookies/auth headers.
- Restricts to specific HTTP methods/headers.

## Helmet

**Helmet** is a collection of Node.js middleware that sets security-related HTTP headers to protect against common web vulnerabilities.

### How it Works
- Sets headers like Content-Security-Policy, X-Frame-Options, etc.
- Multiple small middleware functions for granular control.

### Use Case
Prevent clickjacking, MIME sniffing, XSS via headers.

### Code Example (Node.js)
```javascript
const helmet = require('helmet');

app.use(helmet()); // Basic protection

// Custom configuration
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
  },
}));

app.use(helmet.frameguard({ action: 'deny' })); // Prevent clickjacking
app.use(helmet.noSniff()); // Prevent MIME sniffing
app.use(helmet.xssFilter()); // XSS protection header
```

**Explanation**:
- `contentSecurityPolicy`: Controls resource loading sources.
- `frameguard`: Prevents embedding in iframes.
- `noSniff`: Stops MIME type confusion attacks.

## Complete Scenario: Secure API with Rate Limiting + CORS + Helmet

**Scenario**: Building a REST API for a todo app where:
- Frontend at `localhost:3000` needs to access API at `localhost:5000`.
- Login endpoint protected from brute force.
- All endpoints secured with security headers.

### Complete Code Example
```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// 1. Helmet - Security Headers (FIRST)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

// 2. CORS - Cross-Origin Access
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// 3. Rate Limiting - Protect sensitive endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts' },
});

// JSON parsing (after security middleware)
app.use(express.json());

// Routes
app.post('/api/auth/login', loginLimiter, (req, res) => {
  // Login logic
  res.json({ success: true });
});

app.get('/api/todos', (req, res) => {
  res.json([{ id: 1, text: 'Secure todo' }]);
});

app.listen(5000, () => {
  console.log('Secure API running on port 5000');
});
```

### Code Explanation
1. **Order Matters**:
   - Helmet first: Sets security headers for ALL responses.
   - CORS second: Allows legitimate frontend access.
   - Rate limit on specific routes: Endpoint-specific protection.
   - Body parser last: After security checks.

2. **Combined Protection**:
   - **Helmet** prevents XSS/clickjacking on all endpoints.
   - **CORS** blocks malicious sites but allows trusted frontend.
   - **Rate Limit** stops brute force on login specifically.

3. **Real-world Benefits**:
   - Frontend can fetch todos securely.
   - Attackers can't iframe your login page.
   - Brute force limited to 5 attempts/15min.
   - Invalid MIME types blocked.

This stack provides comprehensive protection for production APIs!

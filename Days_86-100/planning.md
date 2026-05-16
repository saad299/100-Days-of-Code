## 1. Problem and Scope Definition
- What problem does the app solve
- Who is it for
- What is in the MVP and what is explicitly out
- This prevents scope creep during building

---

## 2. Data Models and Database Schema
- Every model and its fields
- Field types and constraints
- Relationships between models — one to many, many to many
- Which fields are required vs optional
- This is the most important planning area — everything else depends on getting this right

---

## 3. API Endpoints
- Every endpoint the backend exposes
- HTTP method for each — GET, POST, PUT, PATCH, DELETE
- What authentication each requires — public, authenticated, owner only
- Request body shape for POST and PUT endpoints
- Response shape for each endpoint
- Grouped by resource — auth endpoints, project endpoints, request endpoints

---

## 4. Frontend Pages
- Every page the Next.js app will have
- The URL/route for each page
- What data each page needs from the API
- Which pages are public vs protected
- What components each page contains at a high level

---

## 5. Tech Stack and Architecture
- Backend — Django, DRF, PostgreSQL, JWT
- Frontend — Next.js, Tailwind, Axios
- Deployment — Railway for backend, Vercel for frontend
- How frontend and backend communicate — CORS setup, base URL, auth headers

---

## 6. Authentication Flow
- How JWT tokens are obtained
- Where tokens are stored on the frontend — localStorage, cookies, context
- How protected routes work in Next.js
- How token refresh works
- This deserves its own planning section because auth touches every part of the app

---

## 7. Project File and Folder Structure
- Django project and app structure
- Next.js folder structure — pages, components, hooks, utils, services
- Where API call functions live
- How components are organized

---

## 8. Day by Day Build Plan
- What gets built each day
- Which days are backend, which are frontend
- Where the buffer days are
- Hard deadlines — deployment must happen by day 99

---
---
---
---
---





# DevCollab — Project Planning Document

---

## 1. Problem and Scope Definition

### The Problem
Finding developers to collaborate with is one of the most common frustrations for independent developers. When someone has a project idea or an ongoing project and needs teammates, there's no dedicated place to go. They post in Discord servers, Reddit threads, or Twitter hoping the right person sees it. The signal-to-noise ratio is terrible and the right people rarely find each other.

### The Solution
DevCollab is a dedicated platform where developers post projects they are building or planning to build, specify the roles and skills they need, and receive collaboration requests from interested developers. Every user has a profile showing their skills and active projects. The entire system is built around making it easy to find the right project or the right collaborator.

### Who It's For
- Developers with project ideas who need teammates
- Developers looking to contribute to interesting projects and build their portfolio
- Developers who want to meet and work with other developers

### What's In the MVP
- User registration and login with JWT authentication
- User profiles with skills, bio, GitHub link, and avatar
- Post a project with title, description, tech stack, and roles needed
- Browse all projects with search and filter by tech stack or role needed
- Send a collaboration request to join a project with a message
- Project owner can accept or reject incoming requests
- Dashboard showing your projects and incoming requests
- Status tracking — collaborators see if their request is pending, accepted, or rejected

### What's Explicitly Out
- Real-time messaging or notifications
- Comments on projects
- Following other users
- Email verification
- Payment or premium features
- Project milestones or task management
- File sharing or code snippets on projects
- Rating or review system for collaborators

Keeping scope tight is what makes a 15-day build realistic and results in a focused, polished product rather than a bloated half-finished one.

---

## 2. Data Models and Database Schema

### User
**Purpose:** Handles authentication only. Profile data lives separately.

**Fields:**
- `id` — primary key, auto-generated
- `username` — unique, required, max 80 chars
- `email` — unique, required
- `password` — hashed, never stored plain
- `is_active` — boolean, default True
- `date_joined` — auto set on creation

**Relationships:**
- Has one Profile (one-to-one)
- Has many Projects (one-to-many, as owner)
- Has many CollaborationRequests (one-to-many, as requester)

---

### Profile
**Purpose:** Stores all public-facing user information separately from auth data.

**Fields:**
- `id` — primary key
- `user` — OneToOneField to User, on_delete CASCADE
- `bio` — TextField, optional
- `avatar` — ImageField, upload to avatars/, optional
- `skills` — TextField, comma-separated, optional
- `github_url` — URLField, optional
- `linkedin_url` — URLField, optional
- `website_url` — URLField, optional
- `location` — CharField max 100, optional

**Auto-creation:** Profile is created automatically via a Django signal (post_save on User) the moment a new User is registered. No manual profile creation needed anywhere in the code.

**Helper method:** `get_skills_list()` — splits the comma-separated skills string into a Python list for use in templates and serializers.

---

### Project
**Purpose:** Represents a project posted by a developer looking for collaborators.

**Fields:**
- `id` — primary key
- `owner` — ForeignKey to User, on_delete CASCADE, related_name='projects'
- `title` — CharField max 200, required
- `description` — TextField, required
- `tech_stack` — TextField, comma-separated, required
- `roles_needed` — TextField, comma-separated, required
- `status` — CharField with choices: active, completed, on_hold — default active
- `is_open` — BooleanField, default True — whether the project is accepting requests
- `created_at` — DateTimeField, auto_now_add
- `updated_at` — DateTimeField, auto_now

**Helper methods:**
- `get_tech_stack_list()` — returns tech_stack as a list
- `get_roles_list()` — returns roles_needed as a list

**Meta:** ordering by `-created_at` so newest projects appear first by default.

---

### CollaborationRequest
**Purpose:** Represents a request from a developer to join a project.

**Fields:**
- `id` — primary key
- `project` — ForeignKey to Project, on_delete CASCADE, related_name='requests'
- `requester` — ForeignKey to User, on_delete CASCADE, related_name='sent_requests'
- `message` — TextField, required — the cover note from the requester
- `status` — CharField with choices: pending, accepted, rejected — default pending
- `created_at` — DateTimeField, auto_now_add

**Constraints:**
- `unique_together` on `project` and `requester` — one request per user per project, enforced at database level

**Meta:** ordering by `-created_at`

---

### Relationship Diagram

```
User (1) ──────────── (1) Profile
  │
  │ (1)
  │
  ├──────────────── (many) Project
  │                           │
  │                           │ (1)
  │                           │
  └──────────────── (many) CollaborationRequest (many) ──┘
```

---

## 3. API Endpoints

### Authentication Endpoints
```
POST   /api/auth/register/
       Body: { username, email, password, password2 }
       Response: { access, refresh, user: { id, username, email } }
       Auth: None

POST   /api/auth/login/
       Body: { email, password }
       Response: { access, refresh, user: { id, username, email } }
       Auth: None

POST   /api/auth/token/refresh/
       Body: { refresh }
       Response: { access }
       Auth: None

POST   /api/auth/logout/
       Body: { refresh }
       Response: { message }
       Auth: Required — blacklists the refresh token
```

### User and Profile Endpoints
```
GET    /api/users/me/
       Response: full profile object of current user
       Auth: Required

PUT    /api/users/me/
       Body: { bio, skills, github_url, linkedin_url, website_url, location }
       Response: updated profile object
       Auth: Required

PATCH  /api/users/me/
       Body: any subset of profile fields
       Response: updated profile object
       Auth: Required

POST   /api/users/me/avatar/
       Body: multipart form with avatar file
       Response: updated profile with new avatar URL
       Auth: Required

GET    /api/users/<username>/
       Response: public profile of that user including their projects
       Auth: None
```

### Project Endpoints
```
GET    /api/projects/
       Query params: search, tech_stack, role, status, page
       Response: paginated list of open projects
       Auth: None

POST   /api/projects/
       Body: { title, description, tech_stack, roles_needed, status, is_open }
       Response: created project object
       Auth: Required

GET    /api/projects/mine/
       Response: list of projects owned by current user
       Auth: Required

GET    /api/projects/<id>/
       Response: full project detail including owner profile
       Auth: None

PUT    /api/projects/<id>/
       Body: all project fields
       Response: updated project object
       Auth: Required — owner only

PATCH  /api/projects/<id>/
       Body: any subset of project fields
       Response: updated project object
       Auth: Required — owner only

DELETE /api/projects/<id>/
       Response: 204 No Content
       Auth: Required — owner only
```

### Collaboration Request Endpoints
```
POST   /api/projects/<id>/requests/
       Body: { message }
       Response: created request object
       Auth: Required — cannot be the project owner

GET    /api/projects/<id>/requests/
       Response: list of all requests for this project
       Auth: Required — owner only

PATCH  /api/projects/<id>/requests/<req_id>/
       Body: { status } — accepted or rejected
       Response: updated request object
       Auth: Required — owner only

GET    /api/requests/mine/
       Response: list of all requests sent by current user with status
       Auth: Required
```

---

## 4. Frontend Pages

### Public Pages — No Authentication Required
```
/
    Landing page
    What DevCollab is, hero section, CTA buttons to register or browse
    List of featured or recent projects
    No data fetching on server, static content

/projects
    Browse all projects
    Search bar — keyword search across title, description, tech stack
    Filter by tech stack — dropdown or tag selection
    Filter by role needed — dropdown
    Paginated grid of ProjectCards
    Each card shows title, owner, tech stack tags, roles needed, created date
    Fetches from GET /api/projects/ with query params

/projects/[id]
    Full project detail
    Title, description, owner profile card, tech stack tags, roles needed
    If unauthenticated — show login prompt where request button would be
    If authenticated and not owner — show Request to Collaborate button
    If authenticated and already requested — show request status badge
    If authenticated and owner — show Edit and Delete buttons
    Fetches from GET /api/projects/<id>/

/profile/[username]
    Public profile of any user
    Avatar, bio, skills, GitHub link, location
    List of their active projects as cards
    Fetches from GET /api/users/<username>/
```

### Auth Pages
```
/login
    Email and password form
    Link to register page
    On success — store tokens, redirect to dashboard or intended page
    Calls POST /api/auth/login/

/register
    Username, email, password, confirm password form
    Link to login page
    On success — store tokens, redirect to dashboard
    Calls POST /api/auth/register/
```

### Protected Pages — Authentication Required
```
/dashboard
    Summary view of everything relevant to the current user
    My Projects section — cards with edit, delete, view requests links
    Incoming Requests section — pending requests across all owned projects
    Quick stats — total projects, total requests received, accepted collaborators
    Fetches from GET /api/projects/mine/ and GET /api/projects/<id>/requests/

/projects/new
    Create project form
    Fields: title, description, tech stack (tag input), roles needed (tag input), status, is_open toggle
    On success — redirect to the new project detail page
    Calls POST /api/projects/

/projects/[id]/edit
    Edit project form, pre-filled with existing data
    Same fields as create form
    On success — redirect to project detail page
    Calls PATCH /api/projects/<id>/

/profile/edit
    Edit own profile form
    Fields: bio, skills, github_url, linkedin_url, website_url, location
    Avatar upload
    On success — redirect to own public profile
    Calls PATCH /api/users/me/

/requests
    All collaboration requests sent by the current user
    Each row shows project title, owner, message sent, current status badge
    Status badges: grey for pending, green for accepted, red for rejected
    Fetches from GET /api/requests/mine/
```

---

## 5. Tech Stack and Architecture

### Backend
- **Django** — web framework, ORM, admin panel
- **Django REST Framework** — API views, serializers, permissions, routers
- **djangorestframework-simplejwt** — JWT token generation, refresh, blacklist
- **django-cors-headers** — allows Next.js frontend to call the API
- **python-decouple** — reads environment variables from .env file
- **dj-database-url** — parses DATABASE_URL string into Django DATABASES dict
- **Pillow** — required for ImageField on the Profile model
- **PostgreSQL** — production database
- **SQLite** — development database

### Frontend
- **Next.js** — React framework, file-based routing, App Router
- **Tailwind CSS** — utility-first styling
- **Axios** — HTTP client with interceptors for auth and token refresh
- **React Context** — global auth state (current user, tokens)

### Deployment
- **Railway** — hosts Django app and PostgreSQL database together
- **Vercel** — hosts Next.js frontend, auto-deploys from GitHub

### How They Communicate
The Next.js frontend is a completely separate application from the Django backend. They communicate exclusively through the REST API over HTTP. The frontend never touches the database directly.

Every request that requires authentication includes the JWT access token in the Authorization header: `Authorization: Bearer <access_token>`. An Axios instance with a request interceptor attaches this header automatically to every request.

CORS is configured on the Django side via django-cors-headers to allow requests from the Next.js domain — localhost:3000 in development, the Vercel URL in production.

---

## 6. Authentication Flow

### How Tokens Work
JWT (JSON Web Token) authentication works differently from session-based auth. Instead of the server storing session data, it issues a signed token to the client. The client stores this token and includes it in every subsequent request. The server verifies the signature on each request without needing to look anything up in a database.

Two tokens are issued:
- **Access token** — short-lived (15-30 minutes), used in every API request
- **Refresh token** — long-lived (7 days), used only to get a new access token

### Token Storage
Both tokens stored in localStorage. Not cookies because the frontend and backend are on different domains, and httpOnly cookies require more server-side setup. localStorage is simpler for this project scope.

### Auth Context
A React Context (AuthContext) holds the current user object and token state globally. Any component can call useAuth() to get the current user or trigger login/logout.

### Axios Instance
A single Axios instance is created in services/api.js with:
- baseURL set to the Django API URL
- A request interceptor that reads the access token from localStorage and adds Authorization: Bearer <token> to every request automatically
- A response interceptor that catches 401 responses, attempts to refresh the token using the refresh token, stores the new access token, and retries the original request transparently

### Token Refresh Flow
```
Request made → 401 response received
        ↓
Response interceptor catches it
        ↓
POST to /api/auth/token/refresh/ with refresh token
        ↓
New access token received → stored in localStorage
        ↓
Original request retried with new token
        ↓
If refresh also fails → clear all tokens → redirect to /login
```

### Protected Routes in Next.js
A ProtectedRoute wrapper component checks for a valid token in localStorage on mount. If no token exists, it redirects to /login with the intended URL as a query parameter (?next=/dashboard). After login, the user is redirected back to their intended destination.

### Registration Flow
```
User submits register form
        ↓
POST /api/auth/register/
        ↓
Django creates User
        ↓
post_save signal fires → Profile auto-created
        ↓
JWT tokens generated and returned
        ↓
Frontend stores tokens in localStorage
        ↓
AuthContext updated with user data
        ↓
Redirect to /dashboard
```

### Login Flow
```
User submits login form
        ↓
POST /api/auth/login/
        ↓
Django validates credentials
        ↓
JWT access + refresh tokens returned
        ↓
Frontend stores tokens
        ↓
AuthContext updated
        ↓
Redirect to /dashboard or ?next= page
```

---

## 7. Project File and Folder Structure

### Django Backend
```
devcollab-backend/
│
├── devcollab/                  ← project package
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── accounts/                   ← user and profile app
│   ├── models.py               — User (custom), Profile
│   ├── serializers.py          — UserSerializer, ProfileSerializer, RegisterSerializer
│   ├── views.py                — RegisterView, ProfileView, PublicProfileView
│   ├── urls.py
│   ├── signals.py              — auto-create Profile on User creation
│   └── migrations/
│
├── projects/                   ← projects and requests app
│   ├── models.py               — Project, CollaborationRequest
│   ├── serializers.py          — ProjectSerializer, CollaborationRequestSerializer
│   ├── views.py                — ProjectViewSet, CollaborationRequestViewSet
│   ├── urls.py
│   ├── permissions.py          — IsOwner custom permission class
│   └── migrations/
│
├── .env
├── .env.example
├── .gitignore
└── requirements.txt
```

### Next.js Frontend
```
devcollab-frontend/
│
├── src/
│   ├── app/                        ← Next.js App Router
│   │   ├── page.js                 — landing page
│   │   ├── layout.js               — root layout with AuthProvider
│   │   ├── login/page.js
│   │   ├── register/page.js
│   │   ├── dashboard/page.js
│   │   ├── projects/
│   │   │   ├── page.js             — browse projects
│   │   │   ├── new/page.js
│   │   │   └── [id]/
│   │   │       ├── page.js         — project detail
│   │   │       └── edit/page.js
│   │   ├── profile/
│   │   │   ├── [username]/page.js  — public profile
│   │   │   └── edit/page.js
│   │   └── requests/page.js
│   │
│   ├── components/
│   │   ├── ui/                     — Button, Input, Badge, Card, Modal, Spinner
│   │   ├── layout/                 — Navbar, Footer, PageWrapper, ProtectedRoute
│   │   ├── projects/               — ProjectCard, ProjectForm, TechStackTag, RoleTag
│   │   ├── requests/               — RequestCard, RequestForm, StatusBadge
│   │   └── profile/                — ProfileCard, SkillTag, AvatarUpload
│   │
│   ├── context/
│   │   └── AuthContext.js          — global auth state, login/logout functions
│   │
│   ├── hooks/
│   │   ├── useAuth.js              — consumes AuthContext
│   │   ├── useProjects.js          — data fetching for projects
│   │   └── useRequests.js          — data fetching for requests
│   │
│   └── services/
│       ├── api.js                  — Axios instance with interceptors
│       ├── auth.js                 — register, login, logout, refresh
│       ├── projects.js             — all project API calls
│       └── requests.js             — all collaboration request API calls
│
├── .env.local
├── .gitignore
└── package.json
```

---

## 8. Full flow of the DevCollab software:

1. User opens the software for the first time; sees the the project dashboard where all the different projects posted are listed. They can click on any project and browse the projects listed and can see the details of the project, like what skills and tech stack the project requires. If they try to edit or request for collaboration on the project, they are redirected to the register/login page.

2. Upon successful registering/logging in, the user can see that project dashboard once again where the different projects posted are listed. They can click on any project and browse the projects listed and can see the details of the project, like what skills and tech stack the project requires. If they try to edit the project, error is shown, saying something like 'You cannot edit the project. You are not the owner of this project.' But when they try to request for collaboration on the project, a text box is opened in which they can write the request message. The user cannot send and empty request message box, at least 20 characters are required.

3. In the user's dashboard, they can see the stats of:
    1. how many projects they have posted.
    2. how many requests in total the user has requested on other projects.
    3. how many of those are in pending and how many of those requested have been accepted.

4. The navbar will have 'Browse Projects', 'Dashboard', and 'Profile' links that links to relative pages. There will also be a 'Post Project' link button that takes the user to post a new project page whose url will be '/projects/new/'

5. Clicking the 'Profile' in the navbar will take the user to their profile where they can see their profile and also the projects that they have posted. The user can update their profile by clicking the 'Edit Profile' button on their profile

---

## 9. Day by Day Build Plan

### Django Backend (Days 87–90)
```
Day 87 — Project setup, custom User model, JWT auth endpoints
         Goal: register and login working and tested in Postman

Day 88 — Profile model with signal, Project model, CollaborationRequest model
         All migrations, Django admin for all models
         Goal: all database tables created, data enterable via admin

Day 89 — Projects API: serializers, ViewSet, permissions, router
         Goal: full CRUD on projects working and tested in Postman with JWT

Day 90 — Collaboration requests API: send, list, accept/reject, mine
         Search and filter on projects endpoint
         Goal: complete backend — every endpoint working and tested
```

### Next.js Frontend (Days 91–94)
```
Day 91 — Next.js setup, Axios instance with interceptors
         AuthContext, login and register pages connected to API
         ProtectedRoute wrapper
         Goal: auth flow working end to end

Day 92 — Browse projects page with search and filter
         Project detail page with all states
         Goal: public-facing pages working with real data from API

Day 93 — Create project form, edit project form, delete project
         Collaboration request send and status display
         Goal: all write operations working

Day 94 — Dashboard page, public profile page, edit profile page
         Sent requests page
         Goal: all pages complete, entire app navigable
```

### Polish and Deployment (Days 95–99)
```
Day 95 — UI polish, error handling, loading and empty states
Day 96 — Responsive design, end-to-end testing, bug fixes
Day 97 — Pre-deployment prep, Django deploy checklist
Day 98 — Deploy Django to Railway with PostgreSQL
Day 99 — Deploy Next.js to Vercel, connect to live backend, go live
```

### Capstone (Day 100)
```
Day 100 — Final post: what DevCollab is, full tech stack,
          what was hardest, links to live app and GitHub repo,
          reflection on the full 100 days
```

### Buffer Rule
Days 95-97 are the natural buffer. If building days run over, those three days absorb the overflow. The hard deadline is deployment on days 98-99. Everything before that is flexible. A working deployed app beats a feature-complete local app every time.

---

## Testing API endpoints

### Backend endpoints (Test on Postman)

> Authorization endpoints

1. send POST request on http://127.0.0.1:8000/api/auth/register/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "email": "testuser@example.com",
       "password": "testpassword123",
       "password2": "testpass123"
     }
     ```
   - Expected: 201 with access token, refresh token, and user object.

2. send POST request on http://127.0.0.1:8000/api/auth/login/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "username": "testuser",
       "password": "testpassword123"
     }
     ```
   - Expected: 200 with access token, refresh token, and user object. Copy the access token.

3. send POST request on http://127.0.0.1:8000/api/auth/token/refresh/ along with the following JSON object in the Body -> raw -> JSON
   - Request body:
     ```json
     {
       "refresh": "your_refresh_token_here"
     }
     ```
   - Expected: 205 Reset Content with success message. Copy the new access token.

> Profile endpoints

4. send GET request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
   > Authorization: Bearer <your_access_token_here>
   - Expected: 200 with your user and profile data.

5. send PATCH request on http://127.0.0.1:8000/api/auth/users/me/ with the access token in the headers tab of Postman in the following way:
    > Authorization: Bearer <your_access_token_here>
and with the following JSON object in the Body -> raw -> JSON:
    ```json
    {
       "bio": "Django and Next.js developer",
       "skills": "Python, Django, JavaScript, Next.js",
       "github_url": "https://github.com/yourusername",
       "location": "Karachi, Pakistan"
    }
    ```
    - Expected: 200 with updated profile.

---

### Frontend endpoints (Test by running the nextjs app)
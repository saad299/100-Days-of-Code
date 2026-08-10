# DevCollab Backend

A Django REST Framework backend for a developer collaboration platform that enables developers to find projects, connect with other developers, and collaborate on open-source and personal projects.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [System Design](#system-design)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Project Management Flow](#project-management-flow)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)

## Architecture Overview

DevCollab Backend follows a monolithic Django REST Framework architecture with two main applications: `accounts` and `projects`. The system uses JWT-based authentication and provides RESTful APIs for user management, project creation, and collaboration requests.

### High-Level Architecture

```mermaid
graph TB
    Client[Frontend Client] -->|HTTP/HTTPS| API[Django REST API]
    API --> Auth[JWT Authentication]
    API --> Accounts[Accounts App]
    API --> Projects[Projects App]
    Auth --> TokenBlacklist[Token Blacklist]
    Accounts --> DB[(PostgreSQL/SQLite)]
    Projects --> DB
    API --> Static[Static Files]
    API --> Media[Media Files]
    Static --> WhiteNoise[WhiteNoise]
    Media --> Storage[File Storage]
    
    style API fill:#4CAF50
    style DB fill:#2196F3
    style Auth fill:#FF9800
```

### Component Architecture

```mermaid
graph LR
    subgraph "Django Application"
        URL[URL Configuration]
        Middleware[Middleware Layer]
        Views[View Layer]
        Serializers[Serializer Layer]
        Models[Model Layer]
        
        URL --> Middleware
        Middleware --> Views
        Views --> Serializers
        Serializers --> Models
        Models --> DB[(Database)]
    end
    
    subgraph "Apps"
        Accounts[Accounts App]
        Projects[Projects App]
    end
    
    subgraph "External Services"
        JWT[JWT Service]
        CORS[CORS Middleware]
    end
    
    URL --> Accounts
    URL --> Projects
    Views --> JWT
    Middleware --> CORS
```

## Tech Stack

### Core Framework
- **Django 5.2.13** - Web framework
- **Django REST Framework 3.17.1** - API framework
- **Python 3.x** - Programming language

### Authentication & Security
- **djangorestframework_simplejwt 5.5.1** - JWT authentication
- **django-cors-headers 4.9.0** - CORS handling
- **python-decouple 3.8** - Configuration management

### Database
- **PostgreSQL** (production) - Primary database via psycopg2-binary
- **SQLite** (development) - Local development database
- **dj-database-url 3.1.2** - Database URL configuration

### Server & Deployment
- **Gunicorn 26.0.0** - WSGI HTTP server
- **WhiteNoise 6.12.0** - Static file serving
- **Railway** - Cloud deployment platform

### Utilities
- **Pillow 12.2.0** - Image processing for avatars
- **PyJWT 2.12.1** - JWT token handling

## System Design

### Application Structure

```
devcollab-backend/
├── devcollab/
│   ├── devcollab/
│   │   ├── settings/
│   │   │   ├── base.py          # Base settings
│   │   │   ├── development.py   # Development settings
│   │   │   └── production.py   # Production settings
│   │   ├── urls.py              # Main URL configuration
│   │   ├── wsgi.py              # WSGI configuration
│   │   └── asgi.py              # ASGI configuration
│   ├── accounts/                # User management app
│   │   ├── models.py            # User & Profile models
│   │   ├── serializers.py       # Account serializers
│   │   ├── views.py             # Authentication views
│   │   ├── urls.py              # Account URLs
│   │   ├── permissions.py       # Custom permissions
│   │   └── signals.py           # User signals
│   ├── projects/                # Project management app
│   │   ├── models.py            # Project & CollaborationRequest models
│   │   ├── serializers.py       # Project serializers
│   │   ├── views.py             # Project views
│   │   ├── urls.py              # Project URLs
│   │   └── permissions.py       # Project permissions
│   ├── manage.py                # Django management script
│   ├── requirements.txt         # Python dependencies
│   ├── Procfile                 # Process configuration (Railway)
│   └── railway.json             # Railway deployment config
```

### Request Flow

```mermaid
sequenceDiagram
    participant Client
    participant Middleware
    participant Auth
    participant View
    participant Serializer
    participant Model
    participant DB

    Client->>Middleware: HTTP Request
    Middleware->>Auth: Validate JWT Token
    Auth-->>Middleware: User Context
    Middleware->>View: Forward Request
    View->>Serializer: Validate Data
    Serializer-->>View: Validated Data
    View->>Model: Database Operation
    Model->>DB: SQL Query
    DB-->>Model: Query Result
    Model-->>View: Model Instance
    View->>Serializer: Serialize Response
    Serializer-->>View: JSON Data
    View-->>Middleware: HTTP Response
    Middleware-->>Client: JSON Response
```

## Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--|| PROFILE : "has one"
    USER ||--{ PROJECT : "owns many"
    USER ||--{ COLLABORATION_REQUEST : "sends many"
    USER ||--{ COLLABORATION_REQUEST : "receives many"
    PROJECT ||--{ COLLABORATION_REQUEST : "has many"

    USER {
        integer id PK
        string username UK
        string email UK
        string password
        boolean is_active
        datetime date_joined
    }

    PROFILE {
        integer id PK
        integer user_id FK
        text bio
        string avatar
        text skills
        string github_url
        string linkedin_url
        string website_url
        string location
    }

    PROJECT {
        integer id PK
        integer owner_id FK
        string title
        text description
        text tech_stack
        text roles_needed
        string status
        boolean is_open
        datetime created_at
        datetime updated_at
    }

    COLLABORATION_REQUEST {
        integer id PK
        integer project_id FK
        integer requester_id FK
        text message
        string status
        datetime created_at
        datetime updated_at
    }
```

### Models Description

#### User Model (Custom User)
- Extends Django's AbstractUser
- Uses email as the username field (USERNAME_FIELD)
- Includes username, email, and password fields
- One-to-one relationship with Profile

#### Profile Model
- Stores extended user information
- Fields: bio, avatar, skills, social links, location
- Skills stored as comma-separated text
- Avatar image upload to 'avatars/' directory

#### Project Model
- Represents collaboration projects
- Owned by a user (foreign key to User)
- Fields: title, description, tech_stack, roles_needed, status, is_open
- Tech stack and roles stored as comma-separated text
- Status choices: active, completed, on_hold
- Ordered by creation date (newest first)

#### CollaborationRequest Model
- Handles collaboration requests between users
- Links a requester to a project
- Status choices: pending, accepted, rejected
- Unique constraint on (project, requester) to prevent duplicate requests
- Ordered by creation date (newest first)

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register/`
Register a new user account
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123",
    "password2": "securepassword123"
  }
  ```
- **Response:** JWT tokens and user data

#### POST `/api/auth/login/`
Authenticate user and get JWT tokens
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:** JWT access and refresh tokens

#### POST `/api/auth/logout/`
Logout user (blacklist refresh token)
- **Request Body:**
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```
- **Headers:** Authorization: Bearer `<access_token>`

#### POST `/api/auth/token/refresh/`
Refresh access token using refresh token
- **Request Body:**
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```

### User Profile Endpoints

#### GET `/api/auth/users/me/`
Get current user's profile
- **Headers:** Authorization: Bearer `<access_token>`

#### PUT `/api/auth/users/me/`
Update current user's profile (full update)
- **Headers:** Authorization: Bearer `<access_token>`
- **Request Body:** Profile fields

#### PATCH `/api/auth/users/me/`
Partially update current user's profile
- **Headers:** Authorization: Bearer `<access_token>`
- **Request Body:** Partial profile fields

#### GET `/api/auth/users/<username>/`
Get public profile by username
- **Authentication:** Not required

### Project Endpoints

#### GET `/api/projects/`
List all open projects with optional filtering
- **Query Parameters:**
  - `search`: Search in title, description, tech_stack
  - `tech_stack`: Filter by technology
  - `role`: Filter by needed role
- **Authentication:** Not required

#### POST `/api/projects/`
Create a new project
- **Headers:** Authorization: Bearer `<access_token>`
- **Request Body:**
  ```json
  {
    "title": "Project Title",
    "description": "Project description",
    "tech_stack": "React,Node.js,MongoDB",
    "roles_needed": "Frontend,Backend,Designer",
    "status": "active",
    "is_open": true
  }
  ```

#### GET `/api/projects/<id>/`
Retrieve a specific project
- **Authentication:** Not required

#### PUT `/api/projects/<id>/`
Full update a project
- **Headers:** Authorization: Bearer `<access_token>`
- **Permission:** Project owner only

#### PATCH `/api/projects/<id>/`
Partial update a project
- **Headers:** Authorization: Bearer `<access_token>`
- **Permission:** Project owner only

#### DELETE `/api/projects/<id>/`
Delete a project
- **Headers:** Authorization: Bearer `<access_token>`
- **Permission:** Project owner only

#### GET `/api/projects/mine/`
Get current user's projects
- **Headers:** Authorization: Bearer `<access_token>`

### Collaboration Request Endpoints

#### GET `/api/projects/<project_id>/requests/`
List collaboration requests for a project
- **Headers:** Authorization: Bearer `<access_token>`
- **Permission:** Project owner only

#### POST `/api/projects/<project_id>/requests/`
Send a collaboration request to join a project
- **Headers:** Authorization: Bearer `<access_token>`
- **Request Body:**
  ```json
  {
    "message": "I'd like to contribute to this project"
  }
  ```

#### PATCH `/api/projects/<project_id>/requests/<id>/`
Accept or reject a collaboration request
- **Headers:** Authorization: Bearer `<access_token>`
- **Permission:** Project owner only
- **Request Body:**
  ```json
  {
    "status": "accepted"  // or "rejected"
  }
  ```

#### GET `/api/requests/mine/`
Get current user's sent collaboration requests
- **Headers:** Authorization: Bearer `<access_token>`

## Authentication Flow

### JWT Authentication Sequence

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API
    participant JWT
    
    User->>Client: Register/Login
    Client->>API: POST /api/auth/register or /api/auth/login
    API->>JWT: Generate Tokens
    JWT-->>API: Access + Refresh Tokens
    API-->>Client: Tokens + User Data
    Client->>Client: Store Tokens
    
    loop API Requests
        Client->>API: Request with Access Token
        API->>JWT: Validate Access Token
        JWT-->>API: User Context
        API-->>Client: Response
    end
    
    alt Token Expired
        Client->>API: POST /api/auth/token/refresh
        API->>JWT: Validate Refresh Token
        JWT-->>API: New Access Token
        API-->>Client: New Access Token
    end
    
    User->>Client: Logout
    Client->>API: POST /api/auth/logout
    API->>JWT: Blacklist Refresh Token
    API-->>Client: Success
```

### Token Configuration

- **Access Token Lifetime:** 60 minutes
- **Refresh Token Lifetime:** 42 days
- **Token Rotation:** Enabled
- **Blacklist After Rotation:** Disabled

## Project Management Flow

### Project Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Creation: User creates project
    Creation --> Active: Project published
    Active --> Collaboration: Users send requests
    Collaboration --> Review: Owner reviews requests
    Review --> Accepted: Request accepted
    Review --> Rejected: Request rejected
    Accepted --> InProgress: Collaboration starts
    InProgress --> Completed: Project finished
    InProgress --> OnHold: Project paused
    OnHold --> InProgress: Project resumed
    Completed --> [*]
    Active --> Closed: Owner closes project
    Closed --> [*]
```

### Collaboration Request Flow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Owner as Project Owner
    participant Project as Project
    participant API as API

    Dev->>API: View Project Details
    API-->>Dev: Project Info
    Dev->>API: Send Collaboration Request
    API->>Owner: Notification (New Request)
    Owner->>API: View Requests
    API-->>Owner: Request List
    Owner->>API: Accept/Reject Request
    API->>Dev: Status Update
    API-->>Dev: Request Status
    
    alt Accepted
        Dev->>Project: Start Collaboration
    else Rejected
        Dev->>API: View Other Projects
    end
```

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment tool (optional but recommended)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devcollab-backend/devcollab
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Unix/MacOS
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

### Testing

Run the test suite:
```bash
python manage.py test
```

## Environment Configuration

### Development Settings
- **DEBUG:** True
- **Database:** SQLite
- **Allowed Hosts:** localhost, 127.0.0.1
- **CORS Origins:** http://localhost:3000, http://127.0.0.1:3000

### Production Settings
- **DEBUG:** False
- **Database:** PostgreSQL (via DATABASE_URL)
- **Allowed Hosts:** Configured via environment variable
- **CORS Origins:** Configured via environment variable
- **Security:** SSL redirect, secure cookies, HSTS enabled

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| SECRET_KEY | Django secret key | `your-secret-key-here` |
| DATABASE_URL | Database connection string | `postgres://user:pass@host:port/dbname` |
| ALLOWED_HOSTS | Comma-separated allowed hosts | `devcollab.com,www.devcollab.com` |
| CORS_ALLOWED_ORIGINS | Comma-separated CORS origins | `https://devcollab.com,https://www.devcollab.com` |

## Deployment

### Railway Deployment

The project is configured for deployment on Railway using the provided `railway.json` and `Procfile`.

#### Railway Configuration
- **Build Command:** Automatically detected
- **Start Command:** `gunicorn devcollab.wsgi:application`
- **Pre-deploy Command:** Database migrations

#### Deployment Steps

1. **Connect Railway to your repository**
2. **Configure environment variables in Railway dashboard**
3. **Deploy** - Railway will automatically build and deploy

#### Production Database
- PostgreSQL is automatically provisioned by Railway
- Database URL is injected via `DATABASE_URL` environment variable

#### Static Files
- WhiteNoise middleware handles static file serving
- Static files are collected during build process
- Compressed and versioned for optimal performance

### Manual Deployment

For other platforms, ensure:

1. **Set environment variables**
2. **Install dependencies:** `pip install -r requirements.txt`
3. **Run migrations:** `python manage.py migrate`
4. **Collect static files:** `python manage.py collectstatic --noinput`
5. **Run with Gunicorn:** `gunicorn devcollab.wsgi:application`

## Security Features

- **JWT Authentication:** Token-based authentication with refresh tokens
- **CORS Protection:** Configurable CORS policy for frontend integration
- **Password Validation:** Django's built-in password validators
- **CSRF Protection:** CSRF token validation for web views
- **Security Headers:** SSL redirect, HSTS, XSS protection in production
- **Token Blacklisting:** Logout functionality with token blacklisting

## Performance Optimizations

- **Database Query Optimization:** select_related and prefetch_related for efficient queries
- **Static File Compression:** WhiteNoise compresses static files
- **Database Indexing:** Appropriate indexes on frequently queried fields
- **QuerySet Optimization:** Optimized queries with proper filtering and ordering

## API Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": { ... }
}
```

## License

[Specify your license here]

## Contributing

[Specify contribution guidelines here]

## Support

For issues and questions, please open an issue in the repository or contact the development team.

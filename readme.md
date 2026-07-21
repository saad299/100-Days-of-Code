# 100 Days of code

The sole purpose of creating and starting this 100 days of code was to motivate myself to become a full-stack dev, someone who can knows how the purpose of creating softwares inside and out, someone who can efficiently code in JavaScript, TypeScript, and Python.

This 100 days of code starts from revision of React.js. The reason for doing this was I already know the pre-requisites including HTML, CSS, JavaScript, TailwindCSS, but somehow my learning progress got stalled on React.js. Therefore, I decided to start this 100 days of code.

## Day 1: React Refresher + Project Setup
Installed React + Tailwind

React installation:
> ```powershell
> npm create vite@latest
> ```

named the project `react_app`

then,
> ```powershell
> cd project-directory
> ```

install project dependencies
> ```powershell
> npm install
> ```

install tailwindcss
> ```powershell
> npm install tailwindcss @tailwindcss/vite
> ```

## Day 1: React Refresher
For day 1, go to `Basics.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 2: useState basics
For day2, I used the same `react_app` project
For day 2, go to `State.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 3: Rendering List + Conditional Rendering
For day3, I used the same `react_app` project
For day 3, go to `ListRendering.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 4: useEffect basics
For day4, I used the same `react_app` project
For day 4, go to `Effect.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 5: Fetching Data (useEffect/axios)
For day5, I used the same `react_app` project
For day 5, go to `Fetch.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 6: TypeScript Basics
For day6, I installed and learned the basics of TypeScript
For day 6, go to `TypeScript` folder in `Days_1-10_react` directory

Install TypeScript:
```powershell
npm install -D typescript
```
Then,
```powershell
npx tsc --init
```

Create a TypeScript file. To compile TypeScript file into JavaScript file:
```powershell
npx tsc filename.ts
```
Then, in order to see the result of the compiled JavaScript file:
```powershell
node filename.js
```

You have to manually type the above commands again and again in order to compile the file into js file. In order to automatically compile the TS file into JS and see the result at the same time, do this.
### Step1:
Open the terminal and type the following command:
```powershell
npx tsc --watch
```
This command will automatically compile the TS file into JS whenever you type some TS code in the TS file
### Step2:
Open another terminal (don't close the previous terminal) on the other side in the editor and enter the following command:
```powershell
node --watch filename.js
```
This command will instantly show the result of the JS file once the TS file is done compiling into JS

## Day 7: Custom Hooks
For day7, I used the same `react_app` project
For day 7, go to `Effect.jsx` in `Days_1-10_react/react_app/src/components`

## Day 8: Understanding Form Handling with TypeScript in React
For day8, I used the same `react_app` project
For day 8, go to `FormHandling.jsx` in `Days_1-10_react/react_app/src/components`
Additionally, go to `react_tsx` folder in `Days_1-10_react` directory. go to `FormHandling.tsx` in `Days_1-10_react/react_tsx/src`

## Day 9: Understanding the React Context API
For day9, I used the same `react_app` project
For day 9, go to `context` folder in `Days_1-10_react/react_app/src/components`

## Day 10: Building a Weather App
For day10, I used the same `react_app` project
For day 10, go to `weather_app` folder in `Days_1-10_react/react_app/src/components`
Additionally, go to `react_tsx` folder in `Days_1-10_react` directory. go to `weather_app` folder in `Days_1-10_react/react_tsx/src/components`

## Day 11: Understanding State Management in React
For day11, I created a new folder `Days_11_20` in `Days_1-10_react` directory. In it, I created `react_advanced` folder
For day 11, go to `StateManagement.tsx` folder in `Days_11_20/react_advanced/src/components`

## Day 12: Understanding Zustand
For day12, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 13: TanStack Query
For day13, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 14: Pagination + Infinite Scroll
For day14, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 15: Performance Optimization
For day15, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 16: Routing in React
For day16, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 17: Forms with libraries
For day17, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 18: Understanding File Uploads
For day18, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 19: Tour Project App
For day19, I created a new folder in `src` of the `react_advanced` folder named `TourProject` and started working on Tour Project App

## Day 20: Tour Project App
For day20, I worked and completed the Tour Project App `Days_11_20/react_advanced/src/components/TourProject`

## Day 21: Intro to Backend, Node.js and npm
For day21, I created a new folder `Days_21-30`. In it, I created `app.js` file to learn about backend development.
- File operations with `fs` module
- Path and OS modules
- Basic HTTP server

For day21, go to `app.js` in `Days_21-30` directory

## Day 22: Node.js and npm (continued)
For day22, I continued learning Node.js concepts in the same `app.js` file
- File operations with `fs` module
- Path and OS modules
- Basic HTTP server

For day22, go to `app.js` in `Days_21-30` directory

## Day 23: Intro to Express.js
For day23, I learned Express.js framework basics
- Setting up Express server
- Creating basic routes (GET, POST)
- Running server on specific port

For day23, go to `app.js` in `Days_21-30` directory

## Day 24: Express.js (Advanced)
For day24, I learned advanced Express.js concepts
- Route parameters (`/users/:id`)
- Query parameters (`/search?q=`)
- POST requests with body parsing
- Middleware basics
- Hardcoded REST API with CRUD operations

For day24, go to `exp.js` in `Days_21-30` directory

## Day 25: Middleware
For day25, I learned about middleware in Express.js
- Logger middleware to log requests
- Age check middleware for access control
- Understanding middleware function parameters (req, res, next)

For day25, go to `exp.js` in `Days_21-30` directory

## Day 26: Library Management System (Project)
For day26, I created a full modular Express application - Library Management System
- Separate routes, controllers, middleware, and data folders
- Books, Members, and Borrows management
- Validation middleware
- Authentication middleware
- Modular routing structure

For day26, go to `Days_21-30/library` directory
- Main server: `library/app.js`
- Routes: `library/routes/`
- Controllers: `library/controllers/`
- Middleware: `library/middleware/`
- Data: `library/data/`

## Day 27: Library Management System (continued)
For day27, I continued working on the Library Management System
- Books routes and controller
- Members routes and controller
- Borrows routes and controller

For day27, go to `Days_21-30/library` directory

## Day 28: Modular Routing
For day28, I learned modular routing in Express.js
- Separate route files for different resources
- Controller pattern for business logic
- Middleware for validation

For day28, go to `Days_21-30/modular_routing` directory

## Day 29: Modular Routing (continued)
For day29, I continued working on modular routing
- User routes and controller
- Todo routes and controller
- Logger and validation middleware

For day29, go to `Days_21-30/modular_routing` directory

## Day 30: Review and Practice
For day30, I reviewed all the concepts learned in Days 21-30
- Node.js basics
- Express.js framework
- Middleware
- REST API design
- Modular routing

For day30, review all files in `Days_21-30` directory

## Day 31: Authentication with JWT + MongoDB
For day31, I created a full authentication system using JWT tokens and MongoDB
- User registration and login with bcrypt password hashing
- JWT token generation and verification
- Protected routes with middleware
- MongoDB integration with Mongoose
- TypeScript implementation

For day31, go to `Days_31-40/auth` directory
- Main server: `auth/src/server.ts`
- Routes: `auth/src/routes/`
- Controllers: `auth/src/controller/`
- Models: `auth/src/models/`
- Middleware: `auth/src/middleware/`
- Config: `auth/src/config/`

## Day 32: CRUD Operations with MongoDB
For day32, I built a complete CRUD application with MongoDB
- Create, Read, Update, Delete operations
- Mongoose schema and models
- Express routes and controllers
- Environment configuration

For day32, go to `Days_31-40/crud` directory
- Main server: `crud/server.js`
- Routes: `crud/routes/`
- Models: `crud/models/`
- Config: `crud/config/`

## Day 33: SQL vs NoSQL Comparison
For day33, I created React components comparing SQL and NoSQL databases
- Understanding relational vs document databases
- When to use SQL vs NoSQL
- React components demonstrating concepts

For day33, go to `Days_31-40` directory and view the JSX files:
- `sql_vs_nosql.jsx`
- `sql-vs-nosql.jsx`
- `tables-vs-collections.jsx`

## Day 34: Database Design Concepts
For day34, I continued exploring database concepts
- Table structures vs document structures
- Database relationships
- Schema design patterns

For day34, review the JSX files in `Days_31-40` directory

## Day 35: Authentication Frontend Integration
For day35, I created a React frontend for the authentication system
- Login and registration forms
- JWT token management
- Protected routes
- Axios integration with backend

For day35, go to `Days_41-50/auth_frontend` directory
- Main app: `auth_frontend/src/App.tsx`
- Components: `auth_frontend/src/components/`

## Day 36: TypeScript Advanced Concepts
For day36, I learned advanced TypeScript concepts
- Type definitions and interfaces
- Generic types
- Type inference
- TypeScript configuration

For day36, go to `Days_41-50/typescript` directory

## Day 37: File Upload Implementation
For day37, I learned about file upload functionality
- Multer middleware for file handling
- File validation
- Storage configuration
- Frontend file upload components

For day37, go to `Days_41-50/File_Upload.md`

## Day 38: Security Best Practices
For day38, I studied security practices for web applications
- Authentication security
- Data validation
- CORS configuration
- Environment variables

For day38, go to `Days_41-50/security.md`

## Day 39: Deployment Strategies
For day39, I learned about deployment strategies
- Backend deployment
- Frontend deployment
- CI/CD concepts
- Environment management

For day39, go to `Days_41-50/deployment_summary.md`

## Day 40: Full-Stack Review
For day40, I reviewed all full-stack concepts learned
- Authentication systems
- Database integration
- API development
- Frontend-backend integration

For day40, review all files in `Days_31-40` and `Days_41-50` directories

## Day 41: Next.js Introduction
For day41, I started learning Next.js framework
- Next.js project setup
- App Router
- Server components
- MongoDB integration

For day41, go to `Days_51-60/nextapp` directory
- App directory: `nextapp/app/`
- Components: `nextapp/components/`
- Actions: `nextapp/actions/`

## Day 42: Next.js Routing
For day42, I learned Next.js routing system
- Dynamic routing with slugs
- Route parameters
- Nested routes
- Route groups

For day42, go to `Days_51-60/nextapp/app` directory
- Blog routes: `nextapp/app/blog/`
- About page: `nextapp/app/about/`
- Contact page: `nextapp/app/contact/`

## Day 43: Next.js Data Fetching
For day43, I learned Next.js data fetching patterns
- Server actions
- MongoDB integration
- API routes
- Client-side fetching

For day43, go to `Days_51-60/nextapp/actions/` and `nextapp/app/api/`

## Day 44: Task Management App
For day44, I created a task management application with Next.js
- Task CRUD operations
- MongoDB database
- Server actions
- UI components with shadcn/ui

For day44, go to `Days_51-60/taskapp` directory
- App directory: `taskapp/app/`
- Components: `taskapp/components/`
- Database: `taskapp/db/`

## Day 45: Next.js Advanced Features
For day45, I explored advanced Next.js features
- Server components vs client components
- Streaming and suspense
- Error handling
- Metadata management

For day45, review files in `Days_51-60/taskapp` directory

## Day 46: Django Introduction
For day46, I started learning Django framework
- Django project setup
- Django apps
- Models and migrations
- Django admin

For day46, go to `Days_61-70/Django_project` directory
- Project: `Django_project/Django_project/`
- App: `Django_project/my_first_django_app/`

## Day 47: Django Models and Forms
For day47, I learned Django models and forms
- Model definitions
- Form creation
- Model forms
- Validation

For day47, go to `Days_61-70/Django_project/my_first_django_app/`
- Models: `models.py`
- Forms: `forms.py`

## Day 48: Django Views and Templates
For day48, I learned Django views and templates
- Function-based views
- Template rendering
- Context data
- URL routing

For day48, go to `Days_61-70/Django_project/my_first_django_app/`
- Views: `views.py`
- URLs: `urls.py`
- Templates: `templates/`

## Day 49: Django REST Framework
For day49, I learned Django REST Framework
- Serializers
- API views
- ViewSets
- Routers

For day49, go to `Days_61-70/Django_project/my_first_django_app/`
- Serializers: `serializers.py`

## Day 50: Django Authentication
For day50, I implemented Django authentication
- User authentication
- Login/logout views
- Protected views
- User permissions

For day50, go to `Days_61-70/Add Django Authentication.md`

## Day 51: DevBoard Project
For day51, I started the DevBoard project - a job board application
- Django project structure
- Multiple apps (accounts, jobs)
- User authentication
- Job posting system

For day51, go to `Days_61-70/devboard` directory
- Accounts app: `devboard/accounts_app/`
- Jobs app: `devboard/jobs_app/`
- Main project: `devboard/devboard/`

## Day 52: Django Models and Relationships
For day52, I implemented complex Django models
- Foreign key relationships
- Many-to-many relationships
- Model methods
- Query optimization

For day52, go to `Days_61-70/devboard` directory

## Day 53: Django Templates and Forms
For day53, I worked with Django templates and forms
- Template inheritance
- Form handling
- CSRF protection
- Static files

For day53, go to `Days_61-70/devboard/templates/` directory

## Day 54: Python OOP Concepts
For day54, I reviewed Python object-oriented programming
- Classes and objects
- Inheritance
- Polymorphism
- Encapsulation

For day54, go to `Days_61-70/oop.py`

## Day 55: Python Functions and Modules
For day55, I learned Python functions and modules
- Function definitions
- Lambda functions
- Module imports
- Package structure

For day55, go to `Days_61-70/functions.py`

## Day 56: Flask Introduction
For day56, I started learning Flask framework
- Flask setup
- Routes and views
- Templates
- Request handling

For day56, go to `Days_61-70/flask-app/app.py`

## Day 57: Flask vs Express Comparison
For day57, I compared Flask and Express frameworks
- Framework differences
- Routing comparison
- Middleware comparison
- Template engines

For day57, go to `Days_61-70/flask_vs_express_comparison.html`

## Day 58: Django Advanced Concepts
For day58, I learned advanced Django concepts
- Django signals
- Custom managers
- Middleware
- Context processors

For day58, go to `Days_61-70/advanced.py`

## Day 59: Python Data Structures
For day59, I worked with Python data structures
- Lists and dictionaries
- Sets and tuples
- List comprehensions
- Data manipulation

For day59, go to `Days_61-70/basics.py`

## Day 60: Full-Stack Review
For day60, I reviewed all full-stack concepts
- Django vs Flask vs Express
- Python vs JavaScript
- SQL vs NoSQL
- Framework selection

For day60, review all files in `Days_61-70` directory

## Day 61: Flask Expense Tracker
For day61, I started building an expense tracker with Flask
- Flask application setup
- Database models
- Authentication system
- Expense tracking

For day61, go to `Days_71-85/expense_tracker` directory
- Main app: `expense_tracker/app.py`
- Models: `expense_tracker/model.py`
- Forms: `expense_tracker/form.py`
- Routes: `expense_tracker/routes.py`

## Day 62: Flask Authentication
For day62, I implemented Flask authentication
- User registration
- Login/logout
- Password hashing
- Protected routes

For day62, go to `Days_71-85/expense_tracker/templates/auth/` directory

## Day 63: Flask Templates
For day63, I worked with Flask templates
- Template inheritance
- Jinja2 templating
- Dynamic content
- Form rendering

For day63, go to `Days_71-85/expense_tracker/templates/` directory

## Day 64: Flask Forms and Validation
For day64, I implemented Flask forms with validation
- WTForms integration
- Field validation
- Custom validators
- Error handling

For day64, go to `Days_71-85/expense_tracker/form.py`

## Day 65: Flask Database Operations
For day65, I worked with Flask database operations
- CRUD operations
- Query filtering
- Relationship handling
- Database migrations

For day65, go to `Days_71-85/expense_tracker/routes.py`

## Day 66: Flask Deployment
For day66, I learned Flask deployment
- Procfile configuration
- Requirements.txt
- Environment variables
- Production setup

For day66, go to `Days_71-85/expense_tracker/Procfile` and `requirements.txt`

## Day 67: Flask Advanced Features
For day67, I explored advanced Flask features
- Blueprints
- Custom error handlers
- URL converters
- Flask extensions

For day67, go to `Days_71-85/flask_url_converters.html`

## Day 68: Flask vs Express Deep Dive
For day68, I did a deep comparison of Flask and Express
- Architecture differences
- Ecosystem comparison
- Use cases
- Performance considerations

For day68, go to `Days_71-85/flask_vs_express_comparison.html`

## Day 69: Flask Code Examples
For day69, I created Flask code examples
- Route examples
- Middleware examples
- Template examples
- Database examples

For day69, go to `Days_71-85/flask_code_examples.html`

## Day 70: Flask Mental Model
For day70, I documented my mental model of Flask
- Request/response cycle
- Application context
- Configuration patterns
- Best practices

For day70, go to `Days_71-85/flask_mental_model.md`

## Day 71: DevCollab Project Planning
For day71, I started planning the DevCollab project
- Problem definition
- Scope definition
- Data models
- API endpoints
- Frontend pages

For day71, go to `Days_86-100/planning.md`

## Day 72: DevCollab Backend Setup
For day72, I set up the Django backend for DevCollab
- Django project structure
- Custom user model
- JWT authentication
- CORS configuration

For day72, go to `Days_86-100/devcollab/devcollab-backend/`
- Main project: `devcollab-backend/devcollab/devcollab/`
- Accounts app: `devcollab-backend/devcollab/accounts/`

## Day 73: DevCollab Data Models
For day73, I implemented DevCollab data models
- User and Profile models
- Project model
- CollaborationRequest model
- Model relationships

For day73, go to `Days_86-100/devcollab/devcollab-backend/devcollab/accounts/models.py`
and `devcollab-backend/devcollab/projects/models.py`

## Day 74: DevCollab API Development
For day74, I developed the DevCollab REST API
- Authentication endpoints
- Profile endpoints
- Project endpoints
- Collaboration request endpoints

For day74, go to `Days_86-100/devcollab/devcollab-backend/devcollab/accounts/`
and `devcollab-backend/devcollab/projects/`

## Day 75: DevCollab Frontend Setup
For day75, I set up the Next.js frontend for DevCollab
- Next.js project structure
- Tailwind CSS configuration
- Axios setup
- Environment configuration

For day75, go to `Days_86-100/devcollab/devcollab-frontend/`

## Day 76: DevCollab Authentication Frontend
For day76, I implemented frontend authentication
- Login page
- Registration page
- Auth context
- Protected routes

For day76, go to `Days_86-100/devcollab/devcollab-frontend/src/context/`
and `devcollab-frontend/src/app/login/`

## Day 77: DevCollab Project Pages
For day77, I built project-related pages
- Browse projects page
- Project detail page
- Create project page
- Edit project page

For day77, go to `Days_86-100/devcollab/devcollab-frontend/src/app/projects/`

## Day 78: DevCollab Profile Pages
For day78, I built profile-related pages
- Public profile page
- Edit profile page
- Profile components
- Avatar upload

For day78, go to `Days_86-100/devcollab/devcollab-frontend/src/app/profile/`

## Day 79: DevCollab Dashboard
For day79, I built the dashboard page
- User statistics
- My projects section
- Incoming requests
- Quick actions

For day79, go to `Days_86-100/devcollab/devcollab-frontend/src/app/dashboard/`

## Day 80: DevCollab API Integration
For day80, I integrated frontend with backend API
- API service functions
- Axios interceptors
- Token refresh logic
- Error handling

For day80, go to `Days_86-100/devcollab/devcollab-frontend/src/services/`

## Day 81: DevCollab UI Components
For day81, I built reusable UI components
- Navigation bar
- Project cards
- Profile cards
- Form components
- Modal components

For day81, go to `Days_86-100/devcollab/devcollab-frontend/src/components/`

## Day 82: DevCollab Collaboration Features
For day82, I implemented collaboration features
- Send collaboration request
- View requests
- Accept/reject requests
- Request status tracking

For day82, go to `Days_86-100/devcollab/devcollab-frontend/src/app/projects/[id]/apply/`

## Day 83: DevCollab Testing and Debugging
For day83, I tested and debugged the application
- API endpoint testing
- Frontend testing
- Bug fixes
- Error handling improvements

For day83, go to `Days_86-100/endpoints.md` for API testing documentation

## Day 84: DevCollab Polish and Refinement
For day84, I polished and refined the application
- UI improvements
- Responsive design
- Loading states
- Empty states

For day84, review `Days_86-100/devcollab/devcollab-frontend/src/` directory

## Day 85: DevCollab Deployment Preparation
For day85, I prepared the application for deployment
- Environment configuration
- Build optimization
- Deployment checklist
- Documentation

For day85, review `Days_86-100/devcollab/` directory

## Day 86-100: DevCollab Full-Stack Project
For days 86-100, I built DevCollab - a full-stack collaboration platform for developers

### Backend (Django + DRF + PostgreSQL)
- Custom user authentication with JWT tokens
- Profile management system
- Project posting and management
- Collaboration request system
- RESTful API with Django REST Framework

For backend, go to `Days_86-100/devcollab/devcollab-backend/`
- Main project: `devcollab-backend/devcollab/devcollab/`
- Accounts app: `devcollab-backend/devcollab/accounts/`
- Projects app: `devcollab-backend/devcollab/projects/`

### Frontend (Next.js + Tailwind + Axios)
- User authentication flow
- Project browsing and search
- Profile management
- Dashboard with statistics
- Collaboration request management

For frontend, go to `Days_86-100/devcollab/devcollab-frontend/`
- App pages: `devcollab-frontend/src/app/`
- Components: `devcollab-frontend/src/components/`
- Services: `devcollab-frontend/src/services/`
- Context: `devcollab-frontend/src/context/`

### API Documentation
For complete API endpoint documentation and testing instructions, go to `Days_86-100/endpoints.md`

### Project Planning
For detailed project planning, architecture, and build plan, go to `Days_86-100/planning.md`

### Key Features Implemented
- User registration and login with JWT authentication
- Profile creation and editing with skills, bio, and links
- Project posting with title, description, tech stack, and roles
- Project browsing with search and filter
- Collaboration request system with accept/reject functionality
- Dashboard showing user statistics and activity
- Public profile pages for all users
- Responsive design with Tailwind CSS
- Token refresh mechanism for seamless authentication

### Tech Stack
**Backend:**
- Django 4.x
- Django REST Framework
- djangorestframework-simplejwt
- PostgreSQL
- django-cors-headers

**Frontend:**
- Next.js 16.x
- React 19.x
- Tailwind CSS 4.x
- Axios
- React Context API

**Deployment:**
- Railway (backend + database)
- Vercel (frontend)

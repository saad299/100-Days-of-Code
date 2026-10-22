# DevBoard - AI Agent Guidelines

This document provides rules, regulations, and guidelines for AI LLM models and AI agents working on the DevBoard project.

## Project Overview

**DevBoard** is a Django-based job board platform connecting employers and candidates for developer positions.

**Tech Stack:**
- Django 5.2.13
- Django REST Framework
- SQLite (development), PostgreSQL (production recommended)
- Tailwind CSS (via CDN)
- Python 3.x

**Project Structure:**
```
DevBoard/
├── accounts_app/          # User authentication and profiles
├── jobs_app/              # Job listings and applications
├── devboard/              # Django project settings
├── templates/             # HTML templates
├── static/                # Static files
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies (FIXED ✅)
├── .env                   # Environment variables (not in git)
└── .env.example          # Environment variables template (in git)
```

## Critical Rules

### 1. Requirements.txt (FIXED ✅)
**Status:** The `requirements.txt` file has been fixed with correct Django packages.

**Current packages:**
```
Django==5.2.13
djangorestframework==3.14.0
Pillow==10.0.0
python-dotenv==1.0.0
```

**Action:** Use `pip install -r requirements.txt` to install dependencies.

### 2. Known Bugs - ALL FIXED ✅
All critical bugs have been fixed as of October 22, 2026:

**Bug 1: URL namespace error in employer dashboard** ✅ FIXED
- File: `templates/jobs_app/employer_dashboard.html`
- Fixed: `jobs_app:jobs_app:edit_job` → `jobs_app:edit_job`

**Bug 2: Missing login/logout redirect URLs** ✅ FIXED
- File: `devboard/settings.py`
- Fixed: Uncommented LOGIN_REDIRECT_URL and LOGOUT_REDIRECT_URL

**Bug 3: Location filter missing field name** ✅ FIXED
- File: `jobs_app/views.py`
- Fixed: `jobs.filter(icontains=location)` → `jobs.filter(location__icontains=location)`

**Bug 4: Wrong model reference in apply_job** ✅ FIXED
- File: `jobs_app/views.py`
- Fixed: `Application.objects` → `Job_Application.objects` and `candidate` → `user`

**Bug 5: Missing application status colors** ✅ FIXED
- File: `templates/jobs_app/candidate_dashboard.html`
- Fixed: Added all 7 statuses (applied, shortlisted, rejected, offer, accepted, declined)

### 3. Security Requirements (Partially Implemented ✅)
**NEVER commit or share:**
- Any real user data from `db.sqlite3`
- Environment variables or `.env` file contents

**ALWAYS:**
- ✅ Use environment variables for sensitive configuration (implemented)
- ✅ Set `DEBUG = False` in production (via environment variable)
- ⚠️ Update `ALLOWED_HOSTS` for production domains (still needs implementation)
- ✅ Never use the `django-insecure-` secret key in production (using env var)

**Current Status:**
- ✅ SECRET_KEY reads from environment variable with fallback
- ✅ DEBUG reads from environment variable
- ⚠️ ALLOWED_HOSTS still hardcoded (needs to read from environment)

### 4. Database Rules
- Development uses SQLite (`db.sqlite3`)
- For production, recommend PostgreSQL
- Always create migrations after model changes: `python manage.py makemigrations`
- Always apply migrations: `python manage.py migrate`
- Never manually edit the SQLite database file
- When changing User model, be extremely careful - it's a custom model

## Architecture Guidelines

### Django Apps Structure

**accounts_app:**
- Models: User (custom), EmployerProfile, CandidateProfile
- Views: register_employer, register_candidate, user_login
- Decorators: @employer_required, @candidate_required
- Signals: Auto-creates profiles on user creation

**jobs_app:**
- Models: Job, Job_Application
- Views: job_list, job_detail, apply_job, candidate_dashboard, employer_dashboard, create_job, edit_job, delete_job, job_applications, update_application_status
- API: JobViewSet (REST Framework)
- Serializers: JobSerializer

### URL Routing Rules

**Public Routes (no authentication):**
- `/` - Job listings
- `/jobs/<id>` - Job detail
- `/accounts/login` - Login
- `/accounts/register/employer` - Employer registration
- `/accounts/register/candidate` - Candidate registration

**Employer Routes (requires @employer_required):**
- `/dashboard` - Employer dashboard
- `/jobs/post` - Create job
- `/jobs/edit/<id>` - Edit job
- `/jobs/delete/<id>` - Delete job
- `/jobs/applications/<id>` - View applications
- `/jobs/applications/status/<id>` - Update application status

**Candidate Routes (requires @candidate_required):**
- `/dashboard/candidate` - Candidate dashboard
- `/jobs/apply/<id>` - Apply for job

**API Routes:**
- `/api/jobs/` - REST API for jobs (CRUD)

### Role-Based Access Control

**Custom User Model:**
- Extends `AbstractUser`
- Has `role` field: 'employer' or 'candidate'
- Methods: `is_employer()`, `is_candidate()`

**Decorators:**
- `@employer_required` - Redirects to login if not authenticated or not employer
- `@candidate_required` - Redirects to login if not authenticated or not candidate

**Use these decorators on:**
- All employer-specific views
- All candidate-specific views
- Never on public views

## Code Style Guidelines

### Python/Django Conventions
- Follow PEP 8 style guide
- Use descriptive variable names
- Add docstrings to functions and classes
- Use Django's built-in functions and methods
- Prefer `get_object_or_404` over `try/except` for single object retrieval
- Use `select_related` and `prefetch_related` for query optimization

### View Organization
Organize views in sections with comments:
```python
# =============================================================================
# SECTION 1: API VIEWS
# =============================================================================

# =============================================================================
# SECTION 2: PUBLIC VIEWS
# =============================================================================

# =============================================================================
# SECTION 3: CANDIDATE VIEWS
# =============================================================================

# =============================================================================
# SECTION 4: EMPLOYER VIEWS
# =============================================================================
```

### Template Guidelines
- Always extend `base.html`
- Use Tailwind CSS classes for styling
- Use `{% url 'app_name:view_name' %}` for URL generation
- Always include `{% csrf_token %}` in forms
- Use Bootstrap-like spacing (mb-4, mt-6, etc.)
- Keep templates DRY - use template inheritance and includes

### Model Guidelines
- Use `__str__` methods for readable representations
- Use `Meta` class for ordering and constraints
- Use `choices` for enum-like fields
- Add help_text for complex fields
- Use `blank=True, null=True` appropriately

## Testing Guidelines

### Before Making Changes
1. Always read the existing code to understand patterns
2. Check for similar functionality that already exists
3. Look at existing migrations to understand database structure
4. Review related templates and views

### After Making Changes
1. Run `python manage.py makemigrations` if models changed
2. Run `python manage.py migrate` to apply migrations
3. Test the specific feature you changed
4. Test related features to ensure no regression
5. Check for broken links or missing templates

### Test Coverage (Future)
- Unit tests for models
- Unit tests for forms
- Integration tests for views
- End-to-end tests for user flows

## Development Workflow

### Setting Up the Environment
1. Create virtual environment: `python -m venv venv`
2. Activate virtual environment
3. Copy `.env.example` to `.env` and fill in your values
4. Install dependencies: `pip install -r requirements.txt`
5. Run migrations: `python manage.py migrate`
6. Create superuser: `python manage.py createsuperuser`
7. Run server: `python manage.py runserver`

### Adding New Features
1. Plan the feature (models, views, templates, URLs)
2. Start with models if data structure changes
3. Create and apply migrations
4. Add views with appropriate decorators
5. Add URL patterns
6. Create templates extending base.html
7. Test the feature end-to-end
8. Update this AGENTS.md if adding new patterns

### Debugging
1. Check Django error pages for stack traces
2. Use `print()` statements for quick debugging
3. Use Django Debug Toolbar in development
4. Check browser console for JavaScript errors
5. Verify database state using Django admin or manage.py shell

## Common Patterns

### Creating a New View
```python
from django.shortcuts import render, redirect, get_object_or_404
from accounts_app.decorators import employer_required, candidate_required

@employer_required  # or @candidate_required for candidates
def new_view(request):
    if request.method == 'POST':
        # Handle form submission
        pass
    else:
        # Render form
        pass
    return render(request, 'jobs_app/new_view.html', context)
```

### Creating a New Model
```python
from django.db import models

class NewModel(models.Model):
    field = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.field
```

### Creating a New URL
```python
# In app's urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('new-route/', views.new_view, name='new_view'),
]
```

### Creating a New Template
```django
{% extends 'base.html' %}

{% block title %}Page Title — DevBoard{% endblock %}

{% block content %}
<!-- Content here -->
{% endblock %}
```

## Specific Feature Guidelines

### Job Posting Workflow
1. Employer logs in
2. Goes to `/dashboard`
3. Clicks "Post a New Job"
4. Fills out JobForm
5. Job is saved with employer as foreign key
6. Redirects to employer dashboard

### Application Workflow
1. Candidate logs in
2. Browses jobs at `/`
3. Views job detail at `/jobs/<id>`
4. Clicks "Apply" button
5. Fills out ApplicationForm (cover letter)
6. Application is saved with job and user
7. Redirects to job detail

### Application Status Update
1. Employer logs in
2. Goes to `/dashboard`
3. Clicks application count for a job
4. Views applications at `/jobs/applications/<id>`
5. Clicks status update link
6. Selects new status
7. Application status is updated
8. Redirects back to applications list

## API Guidelines

### REST API Structure
- Uses Django REST Framework
- ViewSet-based API at `/api/jobs/`
- Automatic CRUD operations
- Serializer with display fields
- Permission classes for access control

### API Usage
- GET `/api/jobs/` - List all active jobs
- POST `/api/jobs/` - Create new job (requires auth)
- GET `/api/jobs/<id>/` - Get specific job
- PUT/PATCH `/api/jobs/<id>/` - Update job (requires auth, owner only)
- DELETE `/api/jobs/<id>/` - Delete job (requires auth, owner only)

## File Upload Guidelines

### Current State
- Models have ImageField and FileField
- No MEDIA_URL or MEDIA_ROOT configured
- Uploaded files won't be accessible without configuration

### Required Configuration
Add to `devboard/settings.py`:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

Add to `devboard/urls.py`:
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... existing patterns
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## Deployment Guidelines

### Pre-Deployment Checklist
- [x] Fix all critical bugs ✅
- [x] Set DEBUG from environment variable ✅
- [x] Set SECRET_KEY from environment variable ✅
- [ ] Update ALLOWED_HOSTS from environment variable
- [ ] Configure production database (PostgreSQL)
- [ ] Set up static file serving
- [ ] Set up media file serving
- [ ] Configure email backend
- [ ] Set up logging
- [ ] Enable HTTPS
- [ ] Configure CORS if needed for API

### Environment Variables
Create `.env` file (add to .gitignore):
```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com
DATABASE_URL=postgresql://...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password
```

## Communication Guidelines

### When Reporting Issues
1. Describe the expected behavior
2. Describe the actual behavior
3. Provide steps to reproduce
4. Include error messages/stack traces
5. Mention which files were changed

### When Requesting Features
1. Describe the feature clearly
2. Explain the user benefit
3. Suggest the implementation approach
4. Identify affected components (models, views, templates)
5. Consider edge cases

## Prohibited Actions

**NEVER:**
- Delete the `db.sqlite3` file without backing up
- Manually edit migration files
- Change the User model without extreme caution
- Commit sensitive data (passwords, secret keys)
- Remove the comments in views.py
- Delete the route.txt file (it contains important information)
- Use Flask packages in requirements.txt
- Hardcode credentials in code
- Push to production without testing

## Emergency Procedures

### If Application Won't Start
1. Check Python version compatibility
2. Verify requirements.txt has correct packages
3. Check for syntax errors in Python files
4. Verify database migrations are applied
5. Check for port conflicts (default: 8000)

### If Database Errors Occur
1. Check migrations are up to date
2. Verify SQLite file isn't corrupted
3. Check model field definitions
4. Look for foreign key constraint violations

### If Templates Don't Render
1. Check template path is correct
2. Verify context variables are passed
3. Check for syntax errors in template tags
4. Verify base.html exists and is accessible

## Resources

### Django Documentation
- https://docs.djangoproject.com/en/5.2/
- https://docs.djangoproject.com/en/5.2/topics/http/views/
- https://docs.djangoproject.com/en/5.2/topics/db/models/

### Django REST Framework
- https://www.django-rest-framework.org/

### Tailwind CSS
- https://tailwindcss.com/docs

### Project-Specific
- `route.txt` - Contains route mapping and known issues
- `jobs_app/views_explained.md` - Detailed view explanations (if accessible)

## Version Control

### Git Workflow
- Create feature branches for new features
- Write descriptive commit messages
- Pull before pushing
- Never commit sensitive files (.env, db.sqlite3)
- Use .gitignore for generated files

### .gitignore Should Include
```
*.pyc
__pycache__/
venv/
.env
db.sqlite3
media/
static/
*.log
.DS_Store
```

## Contact and Support

For questions about this project:
1. Review this AGENTS.md file
2. Check DevBoard_Project_Status.md for current issues
3. Review Django documentation
4. Check route.txt for route information

## Last Updated

**Last Update:** October 22, 2026

**Status:** All critical bugs fixed. Project is ready for testing and development.

This document should be updated when:
- New features are added
- Architecture changes are made
- New patterns are established
- Critical bugs are discovered or fixed
- Deployment procedures change

---

**Remember:** This is a learning project built during "100 Days of Code". Prioritize understanding and learning over perfect implementation. Focus on fixing critical bugs before adding new features.

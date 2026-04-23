# =============================================================================
# IMPORTS
# =============================================================================

# Import render to show HTML templates, redirect to send users to another page,
# and get_object_or_404 to safely get a database object or show error page if not found
from django.shortcuts import render, redirect, get_object_or_404

# Import Count to count items in database and Q for building complex search queries
from django.db.models import Count, Q

# Import IntegrityError to handle database errors like duplicate entries
from django.db import IntegrityError

# Import decorator to check if user is logged in (not used directly but good to have)
from django.contrib.auth.decorators import login_required

# Import custom decorators we created to check if user is an employer or candidate
from accounts_app.decorators import employer_required, candidate_required

# Import our Job and Job_Application models to interact with database tables
from .models import Job, Job_Application

# Import forms for creating and editing jobs and job applications
from .forms import JobForm, ApplicationStatusForm, ApplicationForm

# Import serializer to convert Job model data to JSON format for API
from .serilizers import JobSerializer

# Import viewsets to create automatic API endpoints (list, create, update, delete)
from rest_framework import viewsets

# Import permission classes to control who can access our API
from rest_framework import isAuthenticated, AllowAny


# =============================================================================
# SECTION 1: API VIEWS (REST Framework)
# =============================================================================
# This section handles API endpoints for external/front-end applications
# The JobViewSet provides full CRUD operations via REST API
#
# Contents:
# JobViewSet
# =============================================================================


# API ViewSet that automatically creates API endpoints for Job model
# Provides list, create, retrieve, update, and delete operations
class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer

    # Returns only active jobs with employer profile data to reduce database queries
    def get_queryset(self):
        return Job.objects.filter(is_active=True).select_related(
            "employer__employer_profile"
        )

    # Sets permissions: anyone can view jobs, but only logged-in users can create/edit
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [isAuthenticated()]

    # Automatically sets the current user as employer when creating a new job
    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)


# =============================================================================
# SECTION 2: PUBLIC JOB DISCOVERY VIEWS
# =============================================================================
# These views are accessible to everyone (public) and allow candidates to:
# - Browse all available jobs
# - Search and filter jobs by keyword, location, type, experience
# - View detailed information about a specific job
# No login required for these views
#
# Contents:
# jobs_applications()           ← Browse all jobs (public)
# job_list()                    ← Search/filter jobs (public)
# job_detail()                  ← View single job (public)
# =============================================================================


# Shows a list of all active job postings to candidates
# This is the main page where candidates browse available jobs
def jobs_applications(request):
    jobs = Job.objects.filter(is_active=True).select_related(
        "employer__employer_profile"
    )
    return render(request, "jobs_app/job_applications.html", {"jobs": jobs})


# Shows a searchable and filterable list of all active jobs
# Candidates can search by keyword, location, job type, and experience level
def job_list(request):
    jobs = Job.objects.filter(is_active).select_related("employer__employer_profile")

    # search and filter
    keyword = request.GET.get("keyword", "")
    location = request.GET.get("location", "")
    job_type = request.GET.get("job_type", "")
    experience_level = request.GET.get("experience_level", "")

    if keyword:
        jobs = jobs.filter(
            Q(title__icontains=keyword)
            | Q(description__icontains=keyword)
            | Q(tech_stack__icontains=keyword)
        ).distinct()

        if location:
            jobs = jobs.filter(icontains=location)

        if job_type:
            jobs = jobs.filter(job_type=job_type)

        if experience_level:
            jobs = jobs.filter(experience_level=experience_level)

        context = {
            "jobs": jobs,
            "keyword": keyword,
            "location": location,
            "job_type": job_type,
            "experience_level": experience_level,
            "job_type_choices": Job.JOB_TYPE_CHOICES,
            "experience_level_choices": Job.EXPERIENCE_CHOICES,
        }

        return render(request, "jobs_app/job_list.html", context)


# Shows detailed information about a specific job
# Also checks if the current candidate has already applied to this job
def job_detail(request, id):
    job = get_object_or_404(Job, id=id, is_active=True)
    existing_application = None

    if request.user.is_authenticated and request.user.is_candidate():
        existing_application = Application.objects.filter(
            job=job, candidate=request.user
        ).first()

    context = {"job": job, "existing_application": existing_application}

    return render(request, "jobs_app/job_detail.html", context)


# =============================================================================
# SECTION 3: CANDIDATE VIEWS (Requires Candidate Login)
# =============================================================================
# These views are only accessible to logged-in candidates and allow them to:
# - Apply for jobs (submit job applications)
# - View their own dashboard with all their submitted applications
# Protected by @candidate_required decorator
#
# Contents:
# apply_job()                   ← Submit application
# candidate_dashboard()         ← View my applications
# =============================================================================


# Allows candidates to apply for a job
# Prevents duplicate applications from the same candidate
# Only candidates can access this page
@candidate_required
def apply_job(request, id):
    job = get_object_or_404(Job, id=id, is_active=True)

    if Application.objects.filter(job=job, candidate=request.user).exists():
        return redirect("job_detail", id=id)

    if request.method == "POST":
        form = ApplicationForm(request.POST)
        if form.is_valid():
            try:
                application = form.save(commit=False)
                application.job = job
                application.candidate = request.user
                application.save()
                return redirect("job_detail", id=id)
            except IntegrityError:
                return redirect("job_detail", id=id)
        else:
            form = ApplicationForm()

        return render(request, "jobs_app/apply_job.html", {"form": form, "job": job})

        return render(request, "jobs_app/apply_job.html", {"form": form, "job": job})


# Shows the candidate's dashboard with all jobs they have applied to
# Only candidates can access this page
@candidate_required
def candidate_dashboard(request):
    applications = Job_Application.objects.filter(user=request.user).select_related(
        "job"
    )
    return render(
        request, "jobs_app/candidate_dashboard.html", {"applications": applications}
    )


# =============================================================================
# SECTION 4: EMPLOYER VIEWS (Requires Employer Login)
# =============================================================================
# These views are only accessible to logged-in employers and allow them to:
# - View their dashboard with all their posted jobs and application counts
# - Create new job postings
# - Edit their existing job postings
# - Delete their job postings
# - View all applications submitted for their specific jobs
# - Update the status of applications (accept/reject/pending)
# Protected by @employer_required decorator
#
# Contents:
# employer_dashboard()          ← View my jobs + application counts
# create_job()                  ← Post new job
# edit_job()                    ← Modify job
# delete_job()                  ← Remove job
# job_applications()            ← View job applicant for the job
# update_application_status()   ← Accept/reject applications
# =============================================================================


# Shows the employer's dashboard with all their posted jobs
# and counts how many applications each job has received
# Only employers can access this page
@employer_required
def employer_dashboard(request):
    jobs = Job.objects.filter(employer=request.user).annotate(
        application_count=Count("applications")
    )
    return render(request, "jobs_app/employer_dashboard.html", {"jobs": jobs})


# Allows employers to post a new job
# Handles form submission and saves the job with current user as employer
# Only employers can access this page
@employer_required
def create_job(request):
    if request.method == "POST":
        form = JobForm(request.POST)
        if form.is_valid():
            job = form.save(commit=False)
            job.employer = request.user
            job.save()
            return redirect("jobs_app:employer_dashboard")
    else:
        form = JobForm()
    return render(request, "jobs_app/post_job.html", {"form": form})


# Allows employers to edit their existing job posting
# Checks that the employer owns the job before allowing edits
# Only employers can access this page
@employer_required
def edit_job(request, id):
    job = get_object_or_404(Job, id=id)
    if job.employer != request.user:
        return redirect("jobs_app:employer_dashboard")

    if request.method == "POST":
        form = JobForm(request.POST, instance=job)
        if form.is_valid():
            form.save()
            return redirect("jobs_app:employer_dashboard")
    else:
        form = JobForm(instance=job)
    return render(request, "jobs_app/edit_job.html", {"form": form})


# Allows employers to delete their job posting
# Checks that the employer owns the job before allowing deletion
# Only employers can access this page
@employer_required
def delete_job(request, id):
    job = get_object_or_404(Job, id=id)
    if job.employer != request.user:
        return redirect("jobs_app:employer_dashboard")
    if request.method == "POST":
        job.delete()
        return redirect("jobs_app:employer_dashboard")
    return render(request, "jobs_app/delete_job.html", {"job": job})


# Shows all applications submitted for a specific job
# Employers can see applicant details for their own jobs only
# Only employers can access this page
@employer_required
def job_applications(request, id):
    job = get_object_or_404(Job, id=id)
    if job.employer != request.user:
        return redirect("jobs_app:employer_dashboard")
    applications = job.applications.select_related("user__candidate_profile")
    return render(
        request,
        "jobs_app/job_applications.html",
        {
            "job": job,
            "applications": applications,
        },
    )


# Allows updating the status of a job application (accepted, rejected, pending)
# Used by employers to review and manage applications
# Only employers can access this page
@employer_required
def update_application_status(request, id):
    application = get_object_or_404(Job_Application, id=id)
    if request.method == "POST":
        form = ApplicationStatusForm(request.POST, instance=application)
        if form.is_valid():
            form.save()
            return redirect("jobs_app:job_applications", id=application.job.id)
        else:
            return render(
                request, "jobs_app/update_application_status.html", {"form": form}
            )
    else:
        form = ApplicationStatusForm()
        return render(
            request, "jobs_app/update_application_status.html", {"form": form}
        )

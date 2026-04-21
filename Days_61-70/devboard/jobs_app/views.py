from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Count, Q
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from accounts_app.decorators import employer_required, candidate_required
from .models import Job, Job_Application
from .forms import JobForm, ApplicationStatusForm, ApplicationForm

# Create your views here.

def jobs_applications(request):
    jobs = Job.objects.filter(is_active=True).select_related('employer__employer_profile')
    return render(request, "jobs_app/job_applications.html", {"jobs": jobs})
    

@employer_required
def employer_dashboard(request):
    jobs = Job.objects.filter(employer=request.user).annotate(
        application_count=Count("applications")
    )
    return render(request, "jobs_app/employer_dashboard.html", {"jobs": jobs})

@candidate_required
def candidate_dashboard(request):
    applications = Job_Application.objects.filter(user=request.user).select_related('job')
    return render(request, "jobs_app/candidate_dashboard.html", {"applications": applications})


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


@employer_required
def delete_job(request, id):
    job = get_object_or_404(Job, id=id)
    if job.employer != request.user:
        return redirect("jobs_app:employer_dashboard")
    if request.method == "POST":
        job.delete()
        return redirect("jobs_app:employer_dashboard")
    return render(request, "jobs_app/delete_job.html", {"job": job})


@employer_required
def application_list(request, id):
    job = get_object_or_404(Job, id=id)
    if job.employer != request.user:
        return redirect("jobs_app:employer_dashboard")
    applications = job.applications.select_related("user__candidate_profile")
    return render(
        request,
        "jobs_app/application_list.html",
        {
            "job": job,
            "applications": applications,
        },
    )


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

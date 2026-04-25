# jobs_app/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'jobs', views.JobViewSet, basename='job')

app_name = 'jobs_app'

urlpatterns = [
    # API
    path('api/', include(router.urls)),


    # Public
    # Previous ==> path('', views.jobs_applications, name="jobs_applications"),
    path('', views.job_list, name="job_list"),
    path('jobs/<int:id>', views.job_detail, name="job_detail"),

    # candidate
    path('jobs/apply/<int:id>', views.apply_job, name="apply_for_job"),
    path('dashboard/candidate', views.candidate_dashboard, name="candidate_dashboard"),

    # employer
    path('dashboard', views.employer_dashboard, name="employer_dashboard"),
    path('jobs/post', views.create_job, name="post_job"),
    path('jobs/edit/<int:id>', views.edit_job, name="edit_job"),
    path('jobs/delete/<int:id>', views.delete_job, name="delete_job"),
    path('jobs/applications/<int:id>', views.job_applications, name="job_applications"),
    path('jobs/applications/status/<int:id>', views.update_application_status, name="update_application_status"),
]

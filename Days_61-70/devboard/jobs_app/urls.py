# jobs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.job_list, name="job_list"),
    path('dashboard/', views.employer_dashboard, name="employer_dashboard"),
    path('post/', views.create_job, name="post_job"),
    path('edit/<int:id>/', views.edit_job, name="edit_job"),
    path('delete/<int:id>/', views.delete_job, name="delete_job"),
    path('applications/<int:id>/', views.application_list, name="job_applications"),
    path('applications/status/<int:id>/', views.update_application_status, name="update_application_status"),
]

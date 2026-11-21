from django.contrib import admin
from .models import Job, Job_Application

# Register your models here.


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "job_type",
        "experience_level",
        "is_active",
        "created_at",
    ]
    list_filter = [
        "job_type",
        "experience_level",
        "is_active",
    ]
    search_field = [
        "title",
        "description",
        "tech_stack",
    ]


@admin.register(Job_Application)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = [
        "job",
        "user",
        "status",
        "applied_at",
    ]
    list_filter = [
        "status",
    ]
    search_fields = [
        "job__title",
        "user__username",
        "user",
    ]

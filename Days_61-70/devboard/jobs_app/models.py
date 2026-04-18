# from enum import unique
from django.db import models
from django.conf import settings

# Create your models here.


class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("contract", "Contract"),
        ("internship", "Internship"),
        ("freelance", "Freelance"),
        ("remote", "Remote"),
    ]

    EXPERIENCE_CHOICES = [
        ("entry", "Entry Level"),
        ("mid", "Mid Level"),
        ("senior", "Senior Level"),
        ("lead", "Lead / Manager"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    experience_level = models.CharField(max_length=20, choices=EXPERIENCE_CHOICES)
    salary_min = models.IntegerField(blank=True, null=True)
    salary_max = models.IntegerField(blank=True, null=True)
    tech_stack = models.TextField(help_text="Comma separated list of technologies")
    deadline = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def get_tech_stack_list(self):
        return [tech.strip() for tech in self.tech_stack.split(",")]

    def __str__(self):
        return f"{self.title} at {self.employer.employer_profile.company_name}"


class Job_Application(models.Model):
    STATUS_CHOICES = [
        ("applied", "Applied"),
        ("shortlisted", "Shortlisted"),
        ("rejected", "Rejected"),
        ("offer", "Offer"),
        ("accepted", "Accepted"),
        ("declined", "Declined"),
    ]

    job = models.ForeignKey(
        Job, on_delete=models.CASCADE, related_name="applications"
    )
    user = models.ForeignKey(
        "accounts_app.User", on_delete=models.CASCADE, related_name="applications"
    )
    cover_letter = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="applied")
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-applied_at"]
        unique_together = ["job", "user"]
    
    def __str__(self):
        return f"{self.user.username} - {self.job.title}"
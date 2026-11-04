from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    EMPLOYER = 'employer'
    CANDIDATE = 'candidate'
    
    ROLE_CHOICES = [
        (EMPLOYER, 'Employer'),
        (CANDIDATE, 'Candidate'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    bio = models.CharField(blank=True, max_length=200)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)

    def is_employer(self):
        return self.role == self.EMPLOYER
    
    def is_candidate(self):
        return self.role == self.CANDIDATE

    def __str__(self):
        return f"{self.username} ({self.role})"

class EmployerProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employer_profile'
    )
    company_name = models.CharField(max_length=200)
    company_website = models.URLField(blank=True)
    company_logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    company_descript = models.TextField(blank=True)
    founded_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.company_name

class CandidateProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='candidate_profile'
    )
    skills = models.TextField(help_text="Comma-separated list of skills", blank=True)
    experience_years = models.IntegerField(default=0)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    portfolio_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)

    def get_skills_list(self):
        return [skill.strip() for skill in self.skills.split(',')]

    def __str__(self):
        return f"{self.user.username}'s Profile"
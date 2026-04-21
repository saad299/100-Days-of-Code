from django import forms
# from django.contrib.auth import UserCreationForm
from .models import Job, Job_Application


class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = [
            "title",
            "description",
            "location",
            "job_type",
            "salary_min",
            "salary_max",
            # "company",
            "experience_level",
            "tech_stack",
            # "is_remote",
            # "is_onsite",
            # "is_hybrid",
            "is_active",
            "deadline"
        ]

        widgets = {
            "title": forms.TextInput(attrs={'placeholder': 'e.g. Software Engineer or Django Developer'}),
            "description": forms.Textarea(attrs={'rows': 6, 'placeholder': 'Describe the role, responsibilities, and requirements...'}),
            "location": forms.TextInput(attrs={'placeholder': 'e.g. New York, NY or Remote'}),
            "job_type": forms.Select(attrs={'placeholder': 'Select job type'}),
            "salary_min": forms.NumberInput(attrs={'placeholder': 'Minimum salary'}),
            "salary_max": forms.NumberInput(attrs={'placeholder': 'Maximum salary'}),
            "company": forms.TextInput(attrs={'placeholder': 'Enter company name'}),
            "experience_level": forms.Select(attrs={'placeholder': 'Select experience level'}),
            "tech_stack": forms.TextInput(attrs={'placeholder': 'Enter tech stack (e.g. Python, Django, React)'}),
            "deadline": forms.DateInput(attrs={'type': 'date'}),
            "is_remote": forms.CheckboxInput(),
            "is_onsite": forms.CheckboxInput(),
            "is_hybrid": forms.CheckboxInput(),
            "is_active": forms.CheckboxInput(),

        }


class ApplicationStatusForm(forms.ModelForm):
    class Meta:
        model = Job_Application
        fields = ["status"]

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Job_Application
        fields = ["resume", "cover_letter"]

        widgets = {
            'cover_letter': forms.Textarea(attrs={
                'rows': 10,
                'placeholder': 'Write a cover letter... Tell why you are a great fit for this position!'
            })
        }
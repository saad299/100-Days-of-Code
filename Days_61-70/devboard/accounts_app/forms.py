from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class EmployerRegistrationForm(UserCreationForm):
    company_name = forms.CharField(max_length=200)
    company_website = forms.URLField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'company_name', 'company_website']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = User.EMPLOYER
        if commit:
            user.save()
            user.employer_profile.company_name = self.cleaned_data['company_name']
            user.employer_profile.company_website = self.cleaned_data('company_website', '')
            user.employer_profile.save()
        return user

class CandidateRegistrationForm(UserCreationForm):
    skills = forms.CharField(
        help_text="Enter your skills separated by commas",
        widget=forms.TextInput(attrs={'placeholder': 'Python, Django, JavaScript, React'})
    )
    experience_years = forms.IntegerField(min_value=0, max_value=50, initial=0)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'skills', 'experience_years']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = User.CANDIDATE
        if commit:
            user.save()
            user.candidate_profile.skills = self.cleaned_data['skills']
            user.candidate_profile.experience_years = self.cleaned_data['experience_years']
            user.candidate_profile.save()
        return user
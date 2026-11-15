from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
# from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .forms import EmployerRegistrationForm, CandidateRegistrationForm

# Create your views here.

def register_employer(request):
    if request.method == 'POST':
        form = EmployerRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('jobs_app:employer_dashboard')
    else:
        form = EmployerRegistrationForm()
    return render(request, 'accounts_app/register_employer.html', {'form': form})

def register_candidate(request):
    if request.method == 'POST':
        form = CandidateRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('jobs_app:candidate_dashboard')
    else:
        form = CandidateRegistrationForm()
    return render(request, 'accounts_app/register_candidate.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if user.is_employer():
                return redirect('jobs_app:employer_dashboard')
            else:
                return redirect('jobs_app:candidate_dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts_app/login.html', {'form': form})
from django.shortcuts import redirect
from functools import wraps

def employer_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if not request.user.is_employer():
            return redirect('job_list')
        return view_func(request, *args, **kwargs)
    return wrapper

def candidate_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('login')
        if not request.user.is_candidate():
            return redirect('job_list')
        return view_func(request, *args, **kwargs)
    return wrapper
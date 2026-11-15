# accounts_app/urls.py

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'accounts_app'

urlpatterns = [
    path('register/employer', views.register_employer, name='register_employer'),
    path('register/candidate', views.register_candidate, name='register_candidate'),
    # path('login', auth_views.LoginView.as_view(template_name='accounts_app/login.html'), name='login'),
    path('login', views.user_login, name='login'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
]
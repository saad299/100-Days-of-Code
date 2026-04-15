"""
URL configuration for Django_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def hello(_):
    return HttpResponse("<body style='background-color: lightgray;'><div style='background-color: yellow; padding: 20px;'><h1 style='color: blue;'>Hello World</h1></div></body>")

def dashboard(_):
    return HttpResponse("<body style='background-color: lightgray;'><div style='background-color: magenta; padding: 20px;'><h1 style='color: red;'>This is Dashboard Routing</h1></div></body>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('my_first_django_app.urls'), name='home'),
    path('hello/', hello),
    path('dashboard/', dashboard),
    path('app/', include('my_first_django_app.urls', namespace='app'), name='app'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/', include('my_first_django_app.urls')),
]
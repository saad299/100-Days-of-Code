from django.urls import path
from . import views

app_name = "my_first_django_app"

urlpatterns = [
    path("", views.home, name="home"),
    path("app/", views.app, name="app"),
    path("about/", views.about, name="about"),
    path("posts/", views.posts, name="posts"),
    path("posts/<int:id>/", views.post, name="post"),
]
from django.urls import path
from . import views

app_name = "my_first_django_app"

urlpatterns = [
    path("", views.home, name="home"),
    path("app/", views.app, name="app"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("posts/", views.posts, name="posts"),
    path("posts/<int:id>/", views.post, name="post"),
    # path("post/create/", views.create_post, name="create_post"),
    # path("posts/<int:id>/update/", views.update_post, name="update_post"),
    # path("posts/<int:id>/delete/", views.delete_post, name="delete_post"),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/update/<int:id>/', views.update_post, name='update_post'),
    path('posts/delete/<int:id>/', views.delete_post, name='delete_post'),
    path('register/', views.register, name='register'),
    path('login/', views.loginUser, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('api-keys/', views.api_keys, name='api_keys'),
]
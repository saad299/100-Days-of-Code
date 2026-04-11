from django.http import HttpResponse
from django.shortcuts import render
from .models import Post


# Create your views here.
def app(_):
    return HttpResponse("<h1>Hello from app</h1>")


def home(request):
    data = {"name": "John", "message_count": 5}
    posts = Post.objects.all().order_by("-created_at")
    return render(request, "home.html", data)

def posts(request):
    posts = Post.objects.all().order_by("-created_at")
    return render(request, "posts.html", {"posts": posts})

def post(request, id):
    post = Post.objects.get(id=id)
    return render(request, "post.html", {"post": post})


def about(request):
    data = {"author": "John Doe"}
    return render(request, "about.html", data)

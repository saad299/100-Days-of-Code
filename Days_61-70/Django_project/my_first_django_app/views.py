from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import Post, Contact
from .forms import PostForm


# Create your views here.
def app(_):
    return HttpResponse("<h1>Hello from app</h1>")


def home(request):
    data = {"name": "John", "message_count": 5}
    # posts = Post.objects.all().order_by("-created_at")
    return render(request, "home.html", data)


def posts(request):
    posts = Post.objects.all().order_by("-created_at")
    return render(request, "posts.html", {"posts": posts})


def post(request, id):
    # post = Post.objects.get(id=id)
    post = get_object_or_404(Post, id=id)
    return render(request, "post.html", {"post": post})


def create_post(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("my_first_django_app:posts")
    else:
        form = PostForm()
    return render(request, "create_post.html", {"form": form})


def update_post(request, id):
    post = Post.objects.get(id=id)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect("my_first_django_app:posts")
    else:
        form = PostForm(instance=post)
    return render(request, "update_post.html", {"form": form, "post": post})


def delete_post(request, id):
    post = get_object_or_404(Post, id=id)
    if request.method == "POST":
        post.delete()
        return redirect("my_first_django_app:posts")
    return render(request, "delete_post.html", {"post": post})


def about(request):
    data = {"author": "John Doe"}
    return render(request, "about.html", data)


def contact(request):
    if request.method == "POST":
        Contact.objects.create(
            name=request.POST["name"],
            email=request.POST["email"],
            subject=request.POST["subject"],
            message=request.POST["message"],
        )
        return redirect("my_first_django_app:contact")
    return render(request, "contact.html")

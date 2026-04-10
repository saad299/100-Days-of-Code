from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def app(_):
    return HttpResponse("<h1>Hello from app</h1>")


def home(request):
    data = {"name": "John", "message_count": 5}
    return render(request, "home.html", data)


def about(request):
    data = {"author": "John Doe"}
    return render(request, "about.html", data)

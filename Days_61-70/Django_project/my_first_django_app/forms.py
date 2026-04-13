from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ["title", "content"]
        widgets = {
            "title": forms.TextInput(attrs={"class": "form-control"}),
            "content": forms.Textarea(attrs={"class": "form-control"}),
        }


class RegisterUser(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control"})
    )
    password_confirm = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control"})
    )

    #  To remove the tex 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["username"].help_text = ""
        self.fields["email"].help_text = ""

        self.fields["username"].widget.attrs["placeholder"] = "Enter Username"
        self.fields["email"].widget.attrs["placeholder"] = "Enter Email"
        self.fields["password"].widget.attrs["placeholder"] = "Enter Password"
        self.fields["password_confirm"].widget.attrs["placeholder"] = "Confirm Password"

    class Meta:
        model = User
        fields = ["username", "email", "password"]
        widgets = {
            "username": forms.TextInput(attrs={"class": "form-control"}),
            "email": forms.EmailInput(attrs={"class": "form-control"}),
            "password": forms.PasswordInput(attrs={"class": "form-control"}),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        if password != password_confirm:
            raise forms.ValidationError("Passwords do not match")

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class LoginUser(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Username"}
        ),
        # max_length=150,
        # required=True
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={"class": "form-control", "placeholder": "Password"}
        ),
        # min_length=8,
        # required=True
    )

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if not User.objects.filter(username=username).exists():
            raise forms.ValidationError("Username does not exist.")
        # elif not User.objects.filter(password=password).exists():
        #     raise forms.ValidationError("Password is not correct.")
        return username

# def loginUser(request):
#     if request.method == "POST":
#         form = LoginUser(request, data=request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             password = form.cleaned_data.get('password')
#             user = authenticate(username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return redirect("my_first_django_app:posts")
#     else:
#         form = LoginUser()
    
#     return render(request, "registration/login.html", {"form": form})
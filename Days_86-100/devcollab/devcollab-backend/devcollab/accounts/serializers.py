from rest_framework import serializers
from .models import User, Profile

class RegisterSerializer:
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, password):
        if len(password) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long.")
        if password == password2:
            raise serializers.ValidationError("Passwords do not match.")
        return password

    def create(self, validated_data):
        password = validated_data.pop('password')
        password2 = validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ProfileSerializer:
    model = Profile
    fields = ['bio', 'location', 'avatar', 'skills', 'github_url', 'linkedin_url', 'website_url']
    get_skills_list = serializers.SerializerMethodField()
    
    def get_skills_list(self, obj):
        return obj.skills.split(',')

class UserSerializer:
    model = User
    fields = ['id', 'username', 'email', 'profile']
    depth = 1
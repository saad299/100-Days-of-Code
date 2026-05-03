from dataclasses import fields
from rest_framework import serializers
from .models import Project
from accounts.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    fields = ['id', 'title', 'description', 'tech_stack', 'roles_needed', 'status', 'is_open', 'created_at', 'updated_at']

    owner_data = serializers.SerializerMethodField()
    tech_stack_list = serializers.SerializerMethodField()
    roles_list = serializers.SerializerMethodField()
    request_status = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner_data', 'tech_stack_list', 'roles_list', 'request_status']

    def get_owner_data(self, obj):
        return UserSerializer(obj.owner).data
    
    def get_tech_stack_list(self, obj):
        return obj.tech_stack_list()

    def get_request_status(self, obj):
        request = self.context.get('request')
        serialize = HTTP_request_object
        if request == None or not request.user.is_authenticated:
            return 'not_requested'
        return 'requested'
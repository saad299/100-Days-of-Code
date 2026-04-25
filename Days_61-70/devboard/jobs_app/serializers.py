from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    tech_stack_list = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    job_type_display = serializers.SerializerMethodField()
    experience_level_display = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'company_name',
            'location',
            'job_type',
            'job_type_display',
            'experience_level',
            'experience_level_display',
            'description',
            'tech_stack',
            'tech_stack_list',
            'salary_min',
            'salary_max',
            'deadline',
            'is_active',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def get_tech_stack_list(self, obj):
        return obj.get_tech_stack_list()

    def get_company_name(self, obj):
        try:
            return obj.employer.employer_profile.company_name
        except Exception:
            return None

    def get_job_type_display(self, obj):
        return obj.get_job_type_display()

    def get_experience_level_display(self, obj):
        return obj.get_experience_level_display()
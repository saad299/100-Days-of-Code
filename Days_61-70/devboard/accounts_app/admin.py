from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, EmployerProfile, CandidateProfile

# Register your models here.

@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ['username', 'email', 'role', 'is_active']
    list_filter = ['role', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        ('Role', {'fields': ('role', 'bio', 'avatar', 'location')}),
    )

admin.site.register(EmployerProfile)
admin.site.register(CandidateProfile)
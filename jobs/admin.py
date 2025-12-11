from django.contrib import admin
from .models import Job, Tag


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'status', 'employment_type', 'created_at']
    list_filter = ['status', 'employment_type', 'department']
    search_fields = ['title', 'description', 'department']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'color']

from django.contrib import admin
from .models import Application, Note


class NoteInline(admin.TabularInline):
    model = Note
    extra = 1


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'job', 'status', 'applied_at']
    list_filter = ['status', 'applied_at', 'job']
    search_fields = ['candidate__first_name', 'candidate__last_name', 'candidate__email', 'job__title']
    inlines = [NoteInline]


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['application', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'application__candidate__first_name', 'application__candidate__last_name']

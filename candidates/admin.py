from django.contrib import admin
from .models import Candidate


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'phone', 'created_at']
    list_filter = ['created_at', 'tags']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    filter_horizontal = ['tags']

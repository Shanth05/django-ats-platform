from rest_framework import serializers
from .models import Job, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']


class JobSerializer(serializers.ModelSerializer):
    application_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'department', 'location',
            'employment_type', 'status', 'created_at', 'updated_at',
            'posted_at', 'application_count'
        ]
        read_only_fields = ['created_at', 'updated_at', 'posted_at']

    def get_application_count(self, obj):
        return obj.application_set.count()


class JobDetailSerializer(JobSerializer):
    tags = TagSerializer(many=True, read_only=True)

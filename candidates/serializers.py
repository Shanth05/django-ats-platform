from rest_framework import serializers
from .models import Candidate
from jobs.serializers import TagSerializer
from jobs.models import Tag


class CandidateSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        required=False
    )
    resume_url = serializers.SerializerMethodField()
    application_count = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'email', 'phone',
            'linkedin_url', 'portfolio_url', 'resume', 'resume_url',
            'notes', 'tags', 'tag_ids', 'created_at', 'updated_at',
            'application_count'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_resume_url(self, obj):
        if obj.resume:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.resume.url)
        return None

    def get_application_count(self, obj):
        return obj.application_set.count()

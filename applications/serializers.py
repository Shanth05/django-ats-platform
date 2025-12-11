from rest_framework import serializers
from .models import Application, Note
from jobs.serializers import JobSerializer
from jobs.models import Job
from candidates.serializers import CandidateSerializer
from candidates.models import Candidate


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(),
        source='job',
        write_only=True
    )
    candidate = CandidateSerializer(read_only=True)
    candidate_id = serializers.PrimaryKeyRelatedField(
        queryset=Candidate.objects.all(),
        source='candidate',
        write_only=True
    )
    notes_count = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            'id', 'job', 'job_id', 'candidate', 'candidate_id',
            'status', 'cover_letter', 'notes', 'applied_at',
            'updated_at', 'status_changed_at', 'notes_count'
        ]
        read_only_fields = ['applied_at', 'updated_at', 'status_changed_at']

    def get_notes_count(self, obj):
        return obj.application_notes.count()


class ApplicationDetailSerializer(ApplicationSerializer):
    application_notes = NoteSerializer(many=True, read_only=True)

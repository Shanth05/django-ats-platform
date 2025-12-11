from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, Tag
from .serializers import JobSerializer, JobDetailSerializer, TagSerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'employment_type', 'department']
    search_fields = ['title', 'description', 'department', 'location']
    ordering_fields = ['created_at', 'updated_at', 'posted_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

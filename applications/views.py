from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Application, Note
from .serializers import ApplicationSerializer, ApplicationDetailSerializer, NoteSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.select_related('job', 'candidate').all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'job', 'candidate']
    search_fields = [
        'candidate__first_name', 'candidate__last_name', 'candidate__email',
        'job__title', 'cover_letter', 'notes'
    ]
    ordering_fields = ['applied_at', 'updated_at', 'status_changed_at']
    ordering = ['-applied_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ApplicationDetailSerializer
        return ApplicationSerializer

    @action(detail=True, methods=['post'])
    def add_note(self, request, pk=None):
        application = self.get_object()
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(application=application)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get application statistics"""
        total = Application.objects.count()
        by_status = {}
        for status_code, status_label in Application.STATUS_CHOICES:
            count = Application.objects.filter(status=status_code).count()
            by_status[status_code] = {
                'label': status_label,
                'count': count,
                'percentage': round((count / total * 100) if total > 0 else 0, 1)
            }
        
        return Response({
            'total': total,
            'by_status': by_status
        })


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['application']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

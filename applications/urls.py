from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, NoteViewSet

router = DefaultRouter()
router.register(r'', ApplicationViewSet, basename='application')
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path
from .views import SendNotificationAPIView, NotificationListView, NotificationTemplateViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'templates', NotificationTemplateViewSet, basename='template')


urlpatterns = [
    path('', include(router.urls)),
    path("notify/", SendNotificationAPIView.as_view(), name="notify"),
    path("notifications/", NotificationListView.as_view(), name="notifications"),
]

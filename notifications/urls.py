from django.urls import path
from .views import SendNotificationAPIView, NotificationListView

urlpatterns = [
    path("notify/", SendNotificationAPIView.as_view(), name="notify"),
    path("notifications/", NotificationListView.as_view(), name="notifications"),
]

from django.urls import path
from .views import SendNotificationAPIView

urlpatterns = [
    path("notify/", SendNotificationAPIView.as_view(), name="notify"),
]

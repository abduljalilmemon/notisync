from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets, permissions
from .models import NotificationTemplate, NotificationQueue
from users.models import CustomUser, Organization
from .serializers import NotificationSendSerializer, NotificationQueueSerializer, NotificationTemplateSerializer

from .tasks import process_notification
from django.shortcuts import get_object_or_404

class SendNotificationAPIView(APIView):
    def post(self, request):
        serializer = NotificationSendSerializer(data=request.data)
        if serializer.is_valid():
            org = request.user.org  # assuming user is part of org
            user = get_object_or_404(CustomUser, pk=serializer.validated_data['user_id'], org=org)
            template = get_object_or_404(NotificationTemplate, org=org, key=serializer.validated_data['template_key'])

            # Create a notification queue entry
            notif = NotificationQueue.objects.create(
                template=template,
                user=user,
                params=serializer.validated_data["params"],
                status="queued"
            )

            # Call Celery task asynchronously
            process_notification.delay(notif.id)

            return Response({"message": "Notification queued successfully"}, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = NotificationQueue.objects.filter(user=request.user).order_by('-created_at')
        serializer = NotificationQueueSerializer(notifications, many=True)
        return Response(serializer.data)
    

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class NotificationTemplateViewSet(viewsets.ModelViewSet):
    queryset = NotificationTemplate.objects.all()
    serializer_class = NotificationTemplateSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return NotificationTemplate.objects.filter(org=self.request.user.org)

    def perform_create(self, serializer):
        serializer.save(org=self.request.user.org)
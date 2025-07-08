from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NotificationTemplate, NotificationQueue
from users.models import CustomUser, Organization
from .serializers import NotificationSendSerializer
from django.shortcuts import get_object_or_404

class SendNotificationAPIView(APIView):
    def post(self, request):
        serializer = NotificationSendSerializer(data=request.data)
        if serializer.is_valid():
            org = request.user.org  # assuming user is part of org
            user = get_object_or_404(CustomUser, pk=serializer.validated_data['user_id'], org=org)
            template = get_object_or_404(NotificationTemplate, org=org, key=serializer.validated_data['template_key'])

            # Create a notification queue entry
            NotificationQueue.objects.create(
                template=template,
                user=user,
                params=serializer.validated_data['params'],
                status="queued"
            )

            return Response({"message": "Notification queued successfully"}, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

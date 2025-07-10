from rest_framework import serializers
from .models import NotificationQueue

class NotificationSendSerializer(serializers.Serializer):
    template_key = serializers.CharField()
    user_id = serializers.IntegerField()
    params = serializers.JSONField()
    priority = serializers.ChoiceField(choices=[("low", "Low"), ("normal", "Normal"), ("high", "High")], default="normal")


class NotificationQueueSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source='template.subject')
    body = serializers.CharField(source='template.body')

    class Meta:
        model = NotificationQueue
        fields = ['id', 'subject', 'body', 'params', 'status', 'retries', 'created_at']
from rest_framework import serializers
from .models import NotificationQueue

class NotificationSendSerializer(serializers.Serializer):
    template_key = serializers.CharField()
    user_id = serializers.IntegerField()
    params = serializers.JSONField()
    priority = serializers.ChoiceField(choices=[("low", "Low"), ("normal", "Normal"), ("high", "High")], default="normal")

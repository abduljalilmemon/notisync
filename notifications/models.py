from django.db import models
from users.models import CustomUser, Organization

CHANNEL_CHOICES = (
    ('email', 'Email'),
    ('sms', 'SMS'),
    ('webhook', 'Webhook'),
    ('in_app', 'In-App'),
)

class NotificationTemplate(models.Model):
    org = models.ForeignKey(Organization, on_delete=models.CASCADE)
    key = models.CharField(max_length=100)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    subject = models.CharField(max_length=255, blank=True)
    body = models.TextField()

class NotificationPreference(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    enabled = models.BooleanField(default=True)

class NotificationQueue(models.Model):
    template = models.ForeignKey(NotificationTemplate, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    params = models.JSONField()
    status = models.CharField(default="queued", max_length=20)
    retries = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

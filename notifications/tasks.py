from celery import shared_task
from .models import NotificationQueue

@shared_task
def process_notification(notification_id):
    try:
        notif = NotificationQueue.objects.get(id=notification_id)
        print(f"[SEND] Sending via {notif.template.channel} to user {notif.user.email}")
        print(f"Params: {notif.params}")
        
        notif.status = "sent"
        notif.save()
    except NotificationQueue.DoesNotExist:
        print(f"Notification ID {notification_id} not found")

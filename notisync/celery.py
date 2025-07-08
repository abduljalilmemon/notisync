import os
from celery import Celery

# Set the default Django settings module for the 'celery' program
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "notisync.settings")

app = Celery("notisync")

# Load custom config from Django settings, using `CELERY_` prefix
app.config_from_object("django.conf:settings", namespace="CELERY")

# Auto-discover tasks from all registered apps
app.autodiscover_tasks()

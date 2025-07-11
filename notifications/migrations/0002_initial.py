# Generated by Django 5.2.4 on 2025-07-08 14:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('notifications', '0001_initial'),
        ('users', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='notificationpreference',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notificationqueue',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notificationtemplate',
            name='org',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.organization'),
        ),
        migrations.AddField(
            model_name='notificationqueue',
            name='template',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='notifications.notificationtemplate'),
        ),
    ]

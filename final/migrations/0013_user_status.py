# Generated by Django 3.2.5 on 2021-09-03 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0012_video_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='status',
            field=models.TextField(default='student'),
        ),
    ]

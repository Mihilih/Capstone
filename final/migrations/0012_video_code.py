# Generated by Django 3.2.5 on 2021-09-03 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0011_user_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='code',
            field=models.TextField(default='hi', max_length=10000),
        ),
    ]

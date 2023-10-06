# Generated by Django 3.2.5 on 2021-09-03 13:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0019_user_editor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
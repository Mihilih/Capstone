# Generated by Django 3.2.5 on 2021-09-01 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0009_audio'),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.TextField(max_length=10000)),
            ],
        ),
    ]

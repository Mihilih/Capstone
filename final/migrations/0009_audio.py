# Generated by Django 3.2.5 on 2021-08-30 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0008_auto_20210829_1801'),
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.TextField(max_length=10000)),
            ],
        ),
    ]

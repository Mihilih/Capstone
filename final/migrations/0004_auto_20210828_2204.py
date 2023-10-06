# Generated by Django 3.2.5 on 2021-08-28 16:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('final', '0003_resource'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='resource',
            name='name',
            field=models.CharField(max_length=1000),
        ),
        migrations.AddField(
            model_name='resource',
            name='Category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='final.category'),
        ),
    ]

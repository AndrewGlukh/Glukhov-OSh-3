# Generated by Django 4.2.7 on 2023-11-10 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_delete_item_alter_user_data_first_profile_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_data_first',
            name='HSE_relation',
            field=models.CharField(default='-', max_length=30),
        ),
        migrations.AddField(
            model_name='user_data_first',
            name='job',
            field=models.CharField(default='-', max_length=100),
        ),
        migrations.AddField(
            model_name='user_data_first',
            name='kurs',
            field=models.CharField(default='-', max_length=60),
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-11 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_user_data_first_edulevel_user_data_first_facult_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_data_first',
            name='EduLevel',
        ),
        migrations.RemoveField(
            model_name='user_data_first',
            name='Facult',
        ),
        migrations.RemoveField(
            model_name='user_data_first',
            name='Prog',
        ),
    ]

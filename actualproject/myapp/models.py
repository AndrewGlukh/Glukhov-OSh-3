from django.conf import settings
from django.db import models
from django.utils import timezone


class User_Data_First(models.Model):
    profile_pic = models.ImageField()
    your_name = models.CharField(max_length=100)
    gender=models.CharField(max_length=20)
    birth_date = models.DateField()
    telega = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=12)
    O_sebe = models.CharField(max_length=200)


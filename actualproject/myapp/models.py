from django.conf import settings
from django.db import models

class User_Data_First(models.Model):
    profile_pic = models.ImageField(upload_to="profile_pics/")
    your_name = models.CharField(max_length=100)
    gender=models.CharField(max_length=20)
    birth_date = models.DateField()
    telega = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=12)
    O_sebe = models.CharField(max_length=200)
    HSE_relation = models.CharField(default="-", max_length=30)
    kurs = models.CharField(default="-", max_length=20)
    job = models.CharField(default="-", max_length=100)

""" class User_Data_Second(models.Model):
    HSE_relation = models.CharField(max_length=30)
    kurs = models.CharField(max_length=60)
    job = models.CharField(max_length=100) """



from django.conf import settings
from django.db import models

class User_Text_Data(models.Model):
    your_name = models.CharField(max_length=100)
    gender=models.CharField(max_length=20)
    birth_date = models.DateField()
    telega = models.CharField(max_length=50)
    phone_num = models.CharField(max_length=12, unique=True)
    O_sebe = models.CharField(max_length=200)
    HSE_relation = models.CharField(default="-", max_length=30)
    kurs = models.CharField(default="-", max_length=50)
    job = models.CharField(default="-", max_length=100)

class User_Files(models.Model):
    profile_pic = models.ImageField(upload_to="profile_pics/")
    phone_num = models.CharField(max_length=12, unique=True)



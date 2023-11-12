from rest_framework import serializers
from datetime import datetime
from .models import User_Data_First


class ItemSerializer1(serializers.Serializer):
    profile_pic = serializers.ImageField()
    your_name = serializers.CharField(max_length=100)
    gender = serializers.CharField(min_length=20)
    birth_date = serializers.DateField()
    telega = serializers.CharField(max_length=50)
    phone_num = serializers.CharField(max_length=12)
    O_sebe = serializers.CharField(max_length=200)
    HSE_relation = serializers.CharField(max_length=30)
    kurs = serializers.CharField(max_length=60)
    job = serializers.CharField(max_length=100)
    
    def create(self, validated_data):
        item = User_Data_First.objects.create(profile_pic = validated_data.FILES['profile_pic'],
                                   your_name=validated_data.get('name', None),
                                   gender=validated_data.get('gender', None),
                                   birth_date=validated_data.get('birth_date', 0),
                                   telega=validated_data.get('telega', True),
                                   phone_num=validated_data.get('phone_num', datetime.now()),
                                   O_sebe=validated_data.get('O_sebe', datetime.now()),
                                   HSE_relation = "-",
                                   kurs = "-",
                                   job = "-",
                                   )
        item.save()
        return item

class ItemSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User_Data_First
        fields = '__all__'


""" class ItemSerializer2(serializers.Serializer):
    HSE_relation = serializers.CharField(max_length=30)
    kurs = serializers.CharField(max_length=60)
    job = serializers.CharField(max_length=100)
    
    def create(self, validated_data):
        item = User_Data_First.objects.create(HSE_relation=validated_data.get('name', None),
                                   kurs=validated_data.get('name', None),
                                   job=validated_data.get('gender', None),
                                   )
        item.save()
        return item

class ItemSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User_Data_First
        fields = '__all__' """
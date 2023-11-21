from django.shortcuts import render
from django.http import HttpResponseRedirect
from . import models, serializers
from .models import User_Text_Data, User_Files

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

def firstpage(request):
    return render(request, 'myapp/firstpage.html')

def secondpage(request):
    return render(request, 'myapp/secondpage.html')

def thirdpage(request):
    return render(request, 'myapp/thirdpage.html')


def post_Files(request):
    if request.method == "POST":
        profile_pic = request.FILES['profile_pic']
        phone_num = request.POST.get('phone_num')
        if request.POST.get('telega')=="remove element":
            for i in User_Files.objects.all():
                if i.phone_num==phone_num:
                    i.delete()
        new_acc = User_Files.objects.create(
            profile_pic = profile_pic,
            phone_num = phone_num)
        print(new_acc)
        return HttpResponseRedirect("/myapp/secondpage")
    else:
        return HttpResponseRedirect("/myapp/firstpage")

#Работа с API

@api_view(['GET', 'POST'])
def item_view(request):
    if request.method == 'GET':
        users_text = models.User_Text_Data.objects.all()
        serializer = serializers.ItemSerializer1(users_text, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = serializers.ItemSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ItemViewSet_1(ModelViewSet):
    serializer_class = serializers.ItemSerializer1
    queryset = models.User_Text_Data.objects.all()

class ItemAPIView_1(APIView):
    serializer_class = serializers.ItemSerializer1
    def get(self, request):
        users_text = models.User_Text_Data.objects.all()
        serializer = self.serializer_class(users_text, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ItemViewSet_Files(ModelViewSet):
    serializer_class = serializers.ItemSerializerFiles
    queryset = models.User_Files.objects.all()

class ItemAPIView_Files(APIView):
    serializer_class = serializers.ItemSerializerFiles
    def get(self, request):
        users_files = models.User_Files.objects.all()
        serializer = self.serializer_class(users_files, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import render
from django.http import HttpResponseRedirect
from . import models, serializers
from .forms import FirstPageForm
from .models import User_Data_First

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
def testingform(request):
    context ={}
    context['form']= FirstPageForm()
    return render(request, "myapp/index.html", context)

def index(request):
    return render(request, 'myapp/firstpage.html')

def secondpage(request):
    return render(request, 'myapp/secondpage.html')

def thirdpage(request):
    return render(request, 'myapp/thirdpage.html')


def get_firstform_HTML(request):
    if request.method == "POST":
        Name = request.POST.get('your_name')
        profile_pic = request.FILES['profile_pic']
        gender = request.POST.get('gender')
        date = request.POST.get('Birth_date_inp')
        telega = request.POST.get('telegram')
        phone_num = request.POST.get('phone-num')
        O_sebe = request.POST.get('o-sebe')
        date = date[6]+date[7]+date[8]+date[9]+"-"+date[3]+date[4]+"-"+date[0]+date[1]
        new_acc = User_Data_First.objects.create(
            profile_pic = profile_pic,
            your_name = Name,
            gender = gender,
            birth_date = date,
            telega = telega,
            phone_num = phone_num,
            O_sebe = O_sebe)
        print(new_acc)
        return HttpResponseRedirect("/myapp/secondpage")
    else:
        return HttpResponseRedirect("/myapp/testingform")

def get_firstform(request):
    if request.method == "POST":
        form = FirstPageForm(request.POST)
        if form.is_valid():
            form = FirstPageForm(request.POST)
            if form.is_valid():
                profile_pic = request.FILES['profile_pic']
                name = form.cleaned_data['your_name']
                gender = form.cleaned_data["gender"]
                date = form.cleaned_data["birth_date"]
                telega = form.cleaned_data["telega"]
                phone_num = form.cleaned_data["phone_num"]
                O_sebe = form.cleaned_data["O_sebe"]
                new_acc = User_Data_First.objects.create(
                    profile_pic = profile_pic,
                    your_name = name,
                    gender = gender,
                    birth_date = date,
                    telega = telega,
                    phone_num = phone_num,
                    O_sebe = O_sebe)
                print(new_acc)
            return HttpResponseRedirect("/myapp/acc_added")
    else:
        form = FirstPageForm()
    return render(request, "myapp/index.html", {"form": form})

def acc_added(request):
    return render(request, 'myapp/acc_added.html')

#Работа с API

@api_view(['GET', 'POST'])
def item_view(request):
    if request.method == 'GET':
        users_1 = models.User_Data_First.objects.all()
        serializer = serializers.ItemSerializer1(users_1, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = serializers.ItemSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ItemViewSet_1(ModelViewSet):
    serializer_class = serializers.ItemSerializer1
    queryset = models.User_Data_First.objects.all()

class ItemAPIView_1(APIView):
    serializer_class = serializers.ItemSerializer1
    def get(self, request):
        users_1 = models.User_Data_First.objects.all()
        serializer = self.serializer_class(users_1, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def Finish_User_Creation(request):
    if request.method == "POST":
        user=models.User_Data_First.objects.last()
        idd=user.id
        print(idd)
        user.HSE_relation = request.POST.get('HSE_relation')
        user.kurs = request.POST.get('kurs')
        user.job = request.POST.get('job')

        user.save()
        return HttpResponseRedirect("/myapp/thirdpage")
    else:
        return HttpResponseRedirect("/myapp/testingform")
    
""" class ItemViewSet_2(ModelViewSet):
    serializer_class = serializers.ItemSerializer2
    queryset = models.User_Data_First.objects.all()

class ItemAPIView_2(APIView):
    serializer_class = serializers.ItemSerializer2
    def get(self, request):
        users_2 = models.User_Data_Second.objects.all()
        serializer = self.serializer_class(users_2, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) """
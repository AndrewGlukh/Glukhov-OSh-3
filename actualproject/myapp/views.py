from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import FirstPageForm
from .models import User_Data_First

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

def get_firstform(request):
    if request.method == "POST":
        form = FirstPageForm(request.POST)
        if form.is_valid():
            form = FirstPageForm(request.POST)
            if form.is_valid():
                name = form.cleaned_data['your_name']
                gender = form.cleaned_data["gender"]
                date = form.cleaned_data["birth_date"]
                telega = form.cleaned_data["telega"]
                phone_num = form.cleaned_data["phone_num"]
                O_sebe = form.cleaned_data["O_sebe"]
                new_acc = User_Data_First.objects.create(
                                your_name = name,
                                gender = gender,
                                birth_date = date,
                                telega = telega,
                                phone_num = phone_num,
                                O_sebe = O_sebe)

            return HttpResponseRedirect("/myapp/acc_added")
    else:
        form = FirstPageForm()
    return render(request, "myapp/index.html", {"form": form})

def acc_added(request):
    return render(request, 'myapp/acc_added.html')
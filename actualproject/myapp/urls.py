"""
URL configuration for actualproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'my_app'
router = DefaultRouter()
router.register('users', views.ItemViewSet_1, basename="item-viewset")

urlpatterns = [
    path('testingform', views.testingform, name='index'),
    path('firstpage', views.index, name='firstpage'),
    path('secondpage', views.secondpage, name="secondpage"),
    path('secondpage.html', views.secondpage, name="secondpage"),
    path('thirdpage', views.thirdpage, name="thirdpage"),
    path('thirdpage.html', views.thirdpage, name="thirdpage"),
    path('get_firstform', views.get_firstform, name="get_firstform"),
    path('get_firstform_HTML', views.get_firstform_HTML, name='get_firstform_HTML'),
    path('acc_added', views.acc_added, name="acc_added"),
    path('finish', views.Finish_User_Creation, name='finish'),

    path('users/', views.ItemAPIView_1.as_view(), name='user-view'),
]

urlpatterns += [path(r'api/', include(router.urls))]
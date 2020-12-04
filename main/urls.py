from django.urls import path

from . import views
from .api.urls import urlpatterns as api_urls

urlpatterns = [
    path('', views.index, name='index'),
    path('login',views.login_page, name='login'),
    path('register',views.register, name='register'),
    path('logout',views.logout_page, name='logout'),
    path('notifications',views.notifications, name='notifications'),
    path('notification',views.notification_single, name='notification'),
] + api_urls
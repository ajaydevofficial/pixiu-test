from django.urls import include, path
from rest_framework import routers
from main.api import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/notifications/', views.NotificationViewSet.as_view()),
    path('api/notifications/mark-all-read', views.MarkAllAsRead.as_view()),
    path('api/notifications/remove-new', views.MarkAllAsOld.as_view()),
    path('api/notifications/<int:pk>',views.NotificationView.as_view())
]
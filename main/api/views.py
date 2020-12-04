from main.models import Notification
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import NotificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt

class NotificationViewSet(APIView):
    """
    API endpoint that allows notification to be viewed or edited.
    """
    def get(self, request, format=None):
        serializer_context = {
            'request': request
        }
        notifications = Notification.objects.all().order_by('-created')
        serializer = NotificationSerializer(notifications, many=True, context=serializer_context)
        return Response(serializer.data)

class MarkAllAsRead(APIView):
    """
    API endpoint that allows notification to be edited.
    """
    def patch(self, request, format=None):
        try:
            notifications = Notification.objects.all().update(unread=False,new=False)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class MarkAllAsOld(APIView):
    """
    API endpoint that allows notification to be edited.
    """
    def patch(self, request, format=None):
        try:
            notifications = Notification.objects.all().update(new=False)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class NotificationView(APIView):
    """
    CRUD operation on contacts based on primary key
    """

    def get_object(self, pk):
        try:
            return Notification.objects.get(pk=pk)
        except Notification.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        notification = self.get_object(pk)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    @csrf_exempt
    def patch(self,request, pk, format=None):
        notification = self.get_object(pk)
        data = request.data.dict()
        data['unread'] = data['unread']
        data['new'] = data['new']

        serializer = NotificationSerializer(notification, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

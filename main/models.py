from django.db import models

# Create your models here.
class Notification(models.Model):
    title = models.CharField(max_length=1024, unique=False, null=False)
    image = models.ImageField(upload_to="notifications", null=False)
    text = models.TextField(null=False)
    created = models.DateTimeField(auto_now_add=True,null=False)
    unread = models.BooleanField(null=False,default=True)
    new = models.BooleanField(null=False,default=True)

    def __str__(self):
        return self.title


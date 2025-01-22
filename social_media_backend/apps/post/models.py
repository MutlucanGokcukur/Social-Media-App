import uuid
from django.db import models
from apps.account.models import User
from django.utils.timesince import timesince

class PostAttachment(models.Model):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image      = models.ImageField(upload_to='post_attachments/', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post_attachments')


class Post(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    body        = models.TextField(blank=True, null=True)
    attachments = models.ManyToManyField(PostAttachment, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    created_by  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    
    class Meta:
        ordering = ('-created_at',)
    
    def created_at_formatted(self):
        return timesince(self.created_at)
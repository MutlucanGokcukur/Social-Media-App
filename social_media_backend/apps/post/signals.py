from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .serializers import PostSerializer
from django.conf import settings

@receiver(post_save, sender=Post)
def post_created_or_updated(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    action_type = 'created' if created else 'updated'
    
    group_name = settings.POST_GROUP_NAME

    async_to_sync(channel_layer.group_send)(
        group_name, 
        {
            "type": "post_message",  
            "action": action_type,   
            "post": PostSerializer(instance).data,
        }
    )

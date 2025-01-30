import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

class PostConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        query_string = self.scope.get('query_string', b'').decode()
        params       = dict(param.split('=') for param in query_string.split('&'))
        uuid         = params.get('uuid')

        if not uuid or not await self.is_valid_user(uuid): 
            await self.close() 
            return
        group_name = settings.POST_GROUP_NAME
        await self.channel_layer.group_add(group_name, self.channel_name)
        await self.accept()
        
    async def disconnect(self, close_code):
        group_name = settings.POST_GROUP_NAME
        await self.channel_layer.group_discard(group_name, self.channel_name)
        
    async def post_message(self, event):
        await self.send(text_data=json.dumps({
            "action": event["action"],
            "post": event["post"]
        }))
        
    async def is_valid_user(self, user_id):
        try:
            user = await get_user_model().objects.aget(id=user_id)
            return True
        except ObjectDoesNotExist:
            return False

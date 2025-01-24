import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

class PostConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        await self.channel_layer.group_add(settings.POST_GROUP_NAME, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(settings.POST_GROUP_NAME, self.channel_name)

    async def post_message(self, event):
        await self.send(text_data=json.dumps({
            "action": event["action"],
            "post": event["post"]
        }))

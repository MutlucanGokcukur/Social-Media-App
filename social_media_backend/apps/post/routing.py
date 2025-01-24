from django.urls import path
from .consumers import PostConsumer

websocket_urlpatterns = [
    path("ws/post/", PostConsumer.as_asgi()),
]

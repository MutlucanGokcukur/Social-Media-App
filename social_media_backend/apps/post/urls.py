from django.urls import path
from .api import *


urlpatterns = [
    path('', post_list, name="post_list"),
]

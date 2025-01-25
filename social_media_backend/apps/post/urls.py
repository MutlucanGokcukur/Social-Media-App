from django.urls import path
from .api import *


urlpatterns = [
    path('', post_list, name="post_list"),
    path('profile/<uuid:id>/', post_list_profile, name="post_list_profile"),
    path('create/',post_create, name="post_create"),
]

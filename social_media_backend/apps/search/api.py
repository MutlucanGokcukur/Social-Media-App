from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes
from apps.account.models import User
from apps.account.serializers import UserSerializer
from apps.post.models import Post
from apps.post.serializers import PostSerializer

@api_view(['POST'])
def search(request):
    data  = request.data
    query = data['query']
    
    users            = User.objects.filter(name__icontains=query)
    users_serializer = UserSerializer(users, many=True)
    
    posts            = Post.objects.filter(body__icontains=query)
    posts_serializer = PostSerializer(posts, many=True)
    
    return JsonResponse({
        'users':users_serializer.data,
        'posts':posts_serializer.data
    }, safe=False)

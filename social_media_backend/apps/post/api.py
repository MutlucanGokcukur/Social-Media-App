from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes
from .serializers import PostSerializer
from .models import Post
from .forms import PostForm


@api_view(['GET'])
def post_list(request):
    posts      = Post.objects.all()
    serializer = PostSerializer(posts, many=True)

    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def post_create(request):
    form = PostForm(request.data)
    
    if form.is_valid():
        post            = form.save(commit=False)
        post.created_by = request.user
        post.save()
        
        serializer = PostSerializer(post)
        return JsonResponse(serializer.data, status=201, safe=False)
    else:
        errors = [error for error_list in form.errors.values() for error in error_list]
        return JsonResponse({'errors': errors, 'status': 400}, status=400)
from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .forms import SignupForm
from .models import FriendshipRequest, User 
from .serializers import UserSerializer, FriendshipRequestSerializer

@api_view(['POST'])
@authentication_classes([])
@permission_classes([]) 
def signup(request):
    data    = request.data
    message = 'Signup successful'
    
    form = SignupForm({
        'email'    : data.get('email'),
        'name'     : data.get('name'),
        'password1': data.get('password1'),
        'password2': data.get('password2'),
    })
    
    if form.is_valid():
        form.save()
        return JsonResponse({'message': message, 'status': 200}, status=200)
    else:
        errors = [error for error_list in form.errors.values() for error in error_list]
        return JsonResponse({'errors': errors, 'status': 400}, status=400)
    
@api_view(['GET'])
def me(requset):
    user = requset.user
    return JsonResponse({'id':user.id, 'name': user.name, 'email':user.email}, status=200)


@api_view(['GET'])
def friends(request, pk):
    user = User.objects.get(pk=pk)
    requests = []
    
    if user == request.user:
        requests = FriendshipRequest.objects.filter(created_for=request.user, status=FriendshipRequest.SENT)
        requests = FriendshipRequestSerializer(requests, many=True)
        requests = requests.data

    friends = user.friends.all()

    return JsonResponse({
        'user': UserSerializer(user).data,
        'friends': UserSerializer(friends, many=True).data,
        'requests': requests
    }, safe=False)


@api_view(["POST"])
def send_friendship_request(request,pk):
    user               = User.objects.get(pk=pk)
    friendship_request = FriendshipRequest.objects.create(created_for=user, created_by=request.user)
    return JsonResponse({"message":"Friendship request created"},status=201)

@api_view(['POST'])
def handle_request(request, pk, status):
    user                      = User.objects.get(pk=pk)
    friendship_request        = FriendshipRequest.objects.filter(created_for=request.user).get(created_by=user)
    friendship_request.status = status
    friendship_request.save()

    user.friends.add(request.user)
    user.friends_count += 1
    user.save()
    
    request_user                = request.user
    request_user.friends_count += 1
    request_user.save()

    return JsonResponse({'message': 'friendship request updated'})
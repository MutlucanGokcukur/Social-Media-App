from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .forms import SignupForm

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

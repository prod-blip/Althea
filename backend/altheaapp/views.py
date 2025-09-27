from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import login
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
import json

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """Simple health check endpoint to test connection"""
    return Response({
        'status': 'healthy',
        'message': 'Althea backend is running!',
        'timestamp': '2025-09-27'
    })

@api_view(['POST'])
def google_auth(request):
    """Handle Google OAuth authentication"""
    try:
        token = request.data.get('token')
        if not token:
            return Response({'error': 'No token provided'}, status=400)

        # Verify the token with Google
        try:
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_OAUTH2_CLIENT_ID
            )

            # Get user info from Google
            email = idinfo['email']
            name = idinfo['name']
            google_id = idinfo['sub']

            # Create or get user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'first_name': name.split(' ')[0] if name else '',
                    'last_name': ' '.join(name.split(' ')[1:]) if name and len(name.split(' ')) > 1 else '',
                }
            )

            # Log the user in
            login(request, user)

            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                    'is_new_user': created
                },
                'message': 'Successfully authenticated with Google'
            })

        except ValueError as e:
            return Response({'error': f'Invalid token: {str(e)}'}, status=400)

    except Exception as e:
        return Response({'error': f'Authentication failed: {str(e)}'}, status=500)

@api_view(['POST'])
def logout_user(request):
    """Logout user"""
    from django.contrib.auth import logout
    logout(request)
    return Response({'message': 'Successfully logged out'})

@api_view(['GET'])
def user_profile(request):
    """Get current user profile"""
    if request.user.is_authenticated:
        return Response({
            'user': {
                'id': request.user.id,
                'email': request.user.email,
                'name': f"{request.user.first_name} {request.user.last_name}".strip(),
                'is_authenticated': True
            }
        })
    else:
        return Response({'is_authenticated': False})

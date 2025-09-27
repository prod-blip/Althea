from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
def test_auth(request):
    """Test authentication endpoint"""
    return Response({
        'message': 'Authentication endpoint working!',
        'received_data': request.data
    })

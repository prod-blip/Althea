from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import login
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
import json
import base64
import openai
from PIL import Image
import io
import PyPDF2
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """Simple health check endpoint to test connection"""
    return Response({
        'status': 'healthy',
        'message': 'Althea backend is running!',
        'timestamp': '2025-09-27'
    })

@api_view(['POST'])
@permission_classes([AllowAny])
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

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            print(f"=== JWT TOKEN GENERATION ===")
            print(f"Generated access token: {access_token[:50]}...")
            print(f"Generated refresh token: {refresh_token[:50]}...")
            print(f"=== END TOKEN DEBUG ===")

            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                    'is_new_user': created
                },
                'tokens': {
                    'access': access_token,
                    'refresh': refresh_token
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

@api_view(['POST'])
def analyze_medical_report(request):
    """Analyze medical report using OpenAI"""
    try:
        # Debug authentication and headers
        print(f"=== AUTHENTICATION DEBUG ===")
        print(f"User authenticated: {request.user.is_authenticated}")
        print(f"User: {request.user}")
        print(f"Session key: {request.session.session_key}")
        print(f"Request headers: {dict(request.headers)}")
        auth_header = request.headers.get('Authorization', 'No Authorization header')
        print(f"Authorization header: {auth_header}")
        print(f"=== END DEBUG ===")

        if not request.user.is_authenticated:
            return Response({
                'error': 'Authentication required',
                'debug': {
                    'user_authenticated': request.user.is_authenticated,
                    'session_key': request.session.session_key,
                    'user_id': getattr(request.user, 'id', None)
                }
            }, status=401)

        # Get the uploaded file data
        file_data = request.data.get('file')
        file_type = request.data.get('file_type', '')
        file_name = request.data.get('file_name', 'medical_report')

        if not file_data:
            return Response({'error': 'No file data provided'}, status=400)

        # Check OpenAI API key
        if not settings.OPENAI_API_KEY:
            return Response({'error': 'OpenAI API key not configured'}, status=500)

        # Initialize OpenAI client (v1.x format)
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

        # Extract text based on file type
        extracted_text = ""

        try:
            # Decode base64 file data
            file_content = base64.b64decode(file_data.split(',')[1] if ',' in file_data else file_data)

            if file_type.startswith('image/'):
                # For images, use OpenAI Vision API
                extracted_text = analyze_image_with_openai(file_content, file_type)
            elif file_type == 'application/pdf':
                # Extract text from PDF
                extracted_text = extract_text_from_pdf(file_content)
            elif file_type in ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
                # For now, treat as text (you can add python-docx for better support)
                extracted_text = "Document text extraction not fully implemented for Word docs. Please use PDF or image format."
            else:
                return Response({'error': 'Unsupported file format'}, status=400)

        except Exception as e:
            return Response({'error': f'File processing error: {str(e)}'}, status=400)

        if not extracted_text:
            return Response({'error': 'Could not extract text from the document'}, status=400)

        # Analyze with OpenAI
        analysis_result = analyze_text_with_openai(extracted_text)

        return Response({
            'success': True,
            'analysis': analysis_result,
            'user_id': request.user.id
        })

    except Exception as e:
        return Response({'error': f'Analysis failed: {str(e)}'}, status=500)

def extract_text_from_pdf(file_content):
    """Extract text from PDF file"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"

        return text.strip()
    except Exception as e:
        raise Exception(f"PDF text extraction failed: {str(e)}")

def analyze_image_with_openai(image_content, file_type):
    """Analyze medical report image using OpenAI Vision API"""
    try:
        # Initialize OpenAI client
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

        # Convert image to base64
        image_base64 = base64.b64encode(image_content).decode('utf-8')

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Please extract all text content from this medical report image. Focus on lab values, test results, diagnoses, and any important medical information. Provide the text exactly as it appears in the image."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{file_type};base64,{image_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=2000
        )

        return response.choices[0].message.content

    except Exception as e:
        raise Exception(f"Image analysis failed: {str(e)}")

def analyze_text_with_openai(medical_text):
    """Analyze extracted medical text using OpenAI"""
    try:
        # Initialize OpenAI client
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

        system_prompt = """You are a medical AI assistant designed to help patients understand their medical reports.
        Your goal is to transform medical anxiety into empowerment by providing clear, accessible explanations.

        Please analyze the medical report and provide:
        1. A clear, plain-English summary of the main findings
        2. Key findings or abnormal values (if any)
        3. 5-7 specific questions the patient should ask their doctor
        4. Any urgent concerns that need immediate attention
        5. Reassuring context where appropriate

        Keep your language compassionate, clear, and empowering. Avoid medical jargon.
        If you detect any critical values or urgent findings, clearly flag them.

        Format your response as JSON with these fields:
        - summary: string
        - key_findings: array of strings
        - questions_for_doctor: array of strings
        - urgent_concerns: array of strings (empty if none)
        - reassurance: string (optional reassuring message)
        """

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Please analyze this medical report:\n\n{medical_text}"}
            ],
            max_tokens=1500,
            temperature=0.3
        )

        # Parse the JSON response
        analysis_text = response.choices[0].message.content

        # Try to extract JSON from the response
        try:
            # Look for JSON in the response
            import re
            json_match = re.search(r'\{.*\}', analysis_text, re.DOTALL)
            if json_match:
                analysis_json = json.loads(json_match.group())
            else:
                # Fallback: create structured response from text
                analysis_json = parse_analysis_text(analysis_text)
        except:
            # Fallback parsing
            analysis_json = parse_analysis_text(analysis_text)

        return analysis_json

    except Exception as e:
        raise Exception(f"OpenAI analysis failed: {str(e)}")

def parse_analysis_text(analysis_text):
    """Fallback parser for when JSON parsing fails"""
    return {
        "summary": analysis_text[:500] + "..." if len(analysis_text) > 500 else analysis_text,
        "key_findings": ["Analysis completed - see summary for details"],
        "questions_for_doctor": [
            "Can you explain these results in more detail?",
            "Are there any follow-up tests needed?",
            "What should I monitor going forward?"
        ],
        "urgent_concerns": [],
        "reassurance": "Please discuss these results with your healthcare provider for personalized guidance."
    }

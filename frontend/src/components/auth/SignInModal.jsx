import React, { useState, useEffect } from 'react';
import { X, Heart, AlertCircle } from 'lucide-react';
import ButtonComponent from '../ui/ButtonComponent';
import { apiRequest } from '../../config/api';

const SignInModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load Google Sign-In script
    if (isOpen && !window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeGoogleSignIn();
      };
      document.head.appendChild(script);
    } else if (isOpen && window.google) {
      initializeGoogleSignIn();
    }
  }, [isOpen]);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'filled_blue',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 300,
        }
      );
    }
  };

  const handleGoogleResponse = async (response) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await apiRequest('/api/auth/google/', {
        method: 'POST',
        body: JSON.stringify({
          token: response.credential
        })
      });

      if (result.success) {
        onSuccess(result.user);
        onClose();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Althea
          </h2>
          <p className="text-gray-600">
            Sign in to start understanding your medical reports
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 text-sm font-medium">Sign-in failed</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Google Sign-In */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div id="google-signin-button" className={isLoading ? 'opacity-50 pointer-events-none' : ''}></div>
          </div>

          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-sm">Signing you in...</span>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What you'll get:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Plain-English summaries of your medical reports</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Smart questions to ask your doctor</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>Secure, HIPAA-compliant platform</span>
              </li>
            </ul>
          </div>

          {/* Privacy note */}
          <div className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
            Your medical data is encrypted and never shared.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
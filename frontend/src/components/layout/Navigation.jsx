import React from 'react';
import { Heart } from 'lucide-react';
import { navigation } from '../../data/content';
import Button from '../ui/Button';
import { apiRequest } from '../../config/api';

const Navigation = () => {
  const handleSignIn = async () => {
    try {
      console.log('Testing API connection...');

      // Test health endpoint
      const healthResponse = await apiRequest('/api/health/');
      console.log('Health check response:', healthResponse);

      // Test auth endpoint
      const authResponse = await apiRequest('/api/auth/test/', {
        method: 'POST',
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString()
        })
      });
      console.log('Auth test response:', authResponse);

      alert('Backend connection successful! Check console for details.');
    } catch (error) {
      console.error('API connection failed:', error);
      alert(`Backend connection failed: ${error.message}`);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Althea</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.links.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.text}
              </a>
            ))}
            <Button size="sm" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
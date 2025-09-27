import React, { useState } from 'react';
import { Heart, LogOut, User } from 'lucide-react';
import { navigation } from '../../data/content';
import ButtonComponent from '../ui/ButtonComponent';
import SignInModal from '../auth/SignInModal';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignInSuccess = (authResponse) => {
    console.log('User signed in:', authResponse);
    login(authResponse.user, authResponse.tokens); // Update AuthContext with user data and tokens
    setShowSignInModal(false);
  };

  const handleLogout = async () => {
    await logout();
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
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name || user?.email}</span>
                </div>
                <ButtonComponent
                  size="sm"
                  variant="secondary"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </ButtonComponent>
              </div>
            ) : (
              <ButtonComponent size="sm" onClick={() => setShowSignInModal(true)}>
                Sign In
              </ButtonComponent>
            )}
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSuccess={handleSignInSuccess}
      />
    </nav>
  );
};

export default Navigation;
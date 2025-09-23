import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { headlines } from '../../data/content';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const Hero = () => {
  const [activeHeadline, setActiveHeadline] = useState(0);

  // Auto-rotate headlines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Headline Switcher */}
            <div className="flex flex-wrap gap-2 mb-4">
              {headlines.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveHeadline(index)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                    activeHeadline === index 
                      ? 'bg-blue-600 text-white shadow-md scale-105' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:scale-105'
                  }`}
                >
                  Option {index + 1}
                </button>
              ))}
            </div>

            {/* Dynamic Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-500">
                {headlines[activeHeadline].text}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed transition-all duration-500">
                {headlines[activeHeadline].emphasis}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Upload any medical report and get instant, plain-English explanations plus personalized questions to ask your doctor. Take control of your health journey with confidence.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                Upload a Report
              </Button>
              <Button variant="secondary" size="lg">
                See How It Works
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600 font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600 font-medium">Free to Try</span>
              </div>
              <Badge variant="success" size="sm">
                No Credit Card Required
              </Badge>
            </div>
          </div>

          {/* Right Column - Demo Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-all duration-300">
              
              {/* Browser Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-500 ml-4 font-mono">report-analysis.pdf</span>
              </div>
              
              {/* Report Analysis Content */}
              <div className="space-y-6">
                
                {/* Overall Summary Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-2">Overall Summary</h3>
                      <p className="text-green-700 text-sm leading-relaxed">
                        Your blood work shows excellent kidney function and normal cholesterol levels. Your vitamin D is slightly low but easily correctable.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Doctor Questions Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 mb-3">Questions for Your Doctor</h3>
                      <ul className="text-blue-700 text-sm space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Should I take vitamin D supplements?</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>How often should I retest these levels?</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Are there dietary changes I should make?</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3 text-sm">Key Metrics Tracked</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">Normal</div>
                      <div className="text-xs text-gray-600">Cholesterol</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">Low</div>
                      <div className="text-xs text-gray-600">Vitamin D</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
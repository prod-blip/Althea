import React from 'react';
import { 
  Upload, 
  Brain, 
  Heart 
} from 'lucide-react';
import { steps } from '../../data/content';
import ButtonComponent from '../ui/ButtonComponent';

// Icon mapping for dynamic rendering
const iconMap = {
  Upload: Upload,
  Brain: Brain,
  Heart: Heart
};

// Color mapping for each step
const stepColors = {
  Upload: 'text-blue-600',
  Brain: 'text-green-600',
  Heart: 'text-purple-600'
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Path to Clarity in 3 Simple Steps
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From confusion to confidence in minutes, not hours
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.iconName];
            const colorClass = stepColors[step.iconName];
            
            return (
              <div key={index} className="text-center group relative">
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10 group-hover:bg-blue-700 transition-colors duration-300">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="bg-white rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                    <IconComponent className={`w-12 h-12 ${colorClass} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  
                  {/* Connecting Line (Desktop Only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 -translate-x-12 z-0">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-1">
                    {steps.map((_, stepIndex) => (
                      <div 
                        key={stepIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          stepIndex <= index 
                            ? 'bg-blue-600 group-hover:bg-blue-700' 
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-6">
          {/* Call to Action */}
          <ButtonComponent variant="success" size="lg" className="shadow-xl hover:shadow-2xl">
            Try Althea Free
          </ButtonComponent>
          
          {/* Supporting Text */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              No signup required • Get 3 free reports monthly
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Secure & Private</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>HIPAA Compliant</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Instant Results</span>
              </span>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
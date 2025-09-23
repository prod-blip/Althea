import React from 'react';
import { 
  FileText, 
  MessageCircle, 
  BarChart3, 
  Users 
} from 'lucide-react';
import { benefits } from '../../data/content';
import Card from '../ui/Card';

// Icon mapping for dynamic rendering
const iconMap = {
  FileText: FileText,
  MessageCircle: MessageCircle,
  BarChart3: BarChart3,
  Users: Users
};

// Color mapping for each icon
const iconColors = {
  FileText: 'text-blue-600',
  MessageCircle: 'text-green-600', 
  BarChart3: 'text-purple-600',
  Users: 'text-orange-600'
};

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform Health Anxiety Into Empowered Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop feeling lost and start feeling in control. Althea bridges the gap between complex medical data and clear understanding.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName];
            const iconColorClass = iconColors[benefit.iconName];
            
            return (
              <Card 
                key={index} 
                hover={true}
                padding="lg"
                className="bg-gray-50 border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                    <IconComponent className={`w-8 h-8 ${iconColorClass}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                      {benefit.headline}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Join thousands who've already taken control of their health journey</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
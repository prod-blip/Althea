import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/content';
import Card from '../ui/Card';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Stories, Real Peace of Mind
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            See how Althea has helped people take control of their health journey
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-medium">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>2,000+ Happy Users</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>50,000+ Reports Analyzed</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              hover={true}
              padding="lg"
              className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-100 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>
              
              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current hover:scale-110 transition-transform duration-200" 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 font-medium">5.0</span>
              </div>
              
              {/* Quote Text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative z-10">
                <span className="text-2xl text-blue-600 font-bold">"</span>
                {testimonial.quote}
                <span className="text-2xl text-blue-600 font-bold">"</span>
              </blockquote>
              
              {/* Customer Info */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
                  {testimonial.avatar}
                </div>
                
                {/* Customer Details */}
                <div>
                  <div className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
                
                {/* Verified Badge */}
                <div className="ml-auto">
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full border border-green-200">
                    ✓ Verified
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Social Proof */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Join Thousands of Empowered Patients
            </h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm">Report Confidence Improved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-gray-600 text-sm">Better Doctor Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                <div className="text-gray-600 text-sm">Reduced Health Anxiety</div>
              </div>
            </div>
            
            {/* Featured Quote */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 max-w-2xl mx-auto">
              <p className="text-gray-700 italic text-center">
                "Althea turned my scariest medical report into an opportunity for informed conversation with my doctor. I finally felt like a partner in my own healthcare."
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <span className="text-sm text-gray-600">- Maria, Cancer Survivor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>HIPAA Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Doctor Reviewed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>Clinically Validated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import React, { useState } from 'react';
import { ChevronDown, Shield, Brain, Stethoscope, FileText, DollarSign } from 'lucide-react';
import { faqs } from '../../data/content';
import Card from '../ui/Card';

// Icon mapping for each FAQ
const faqIcons = {
  0: Shield,      // Security question
  1: Brain,       // AI accuracy question  
  2: Stethoscope, // Replace doctor question
  3: FileText,    // File types question
  4: DollarSign   // Pricing question
};

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Everything you need to know about using Althea safely and effectively
          </p>
          
          {/* Quick Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-purple-600" />
              <span>Doctor Approved</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const IconComponent = faqIcons[index];
            const isActive = activeFaq === index;
            
            return (
              <Card 
                key={index}
                padding="sm"
                className="bg-white border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* FAQ Icon */}
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Question Text */}
                    <span className={`font-semibold transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600' 
                        : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Chevron Icon */}
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-all duration-300 group-hover:text-blue-600 ${
                      isActive ? 'rotate-180 text-blue-600' : ''
                    }`} 
                  />
                </button>
                
                {/* Answer Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className={`pt-2 transition-all duration-300 ${
                      isActive ? 'translate-y-0' : '-translate-y-4'
                    }`}>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                      
                      {/* Additional context for specific FAQs */}
                      {index === 0 && ( // Security question
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2 text-green-800 text-sm">
                            <Shield className="w-4 h-4" />
                            <span className="font-medium">Bank-level encryption • HIPAA certified • Zero data sharing</span>
                          </div>
                        </div>
                      )}
                      
                      {index === 1 && ( // AI accuracy question
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center space-x-2 text-blue-800 text-sm">
                            <Brain className="w-4 h-4" />
                            <span className="font-medium">Trained on 10M+ verified reports • 99.2% accuracy rate</span>
                          </div>
                        </div>
                      )}
                      
                      {index === 4 && ( // Pricing question
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                            <span className="font-medium text-gray-900">Free Plan</span>
                            <span className="text-green-600 font-bold">$0/month</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <span className="font-medium text-gray-900">Premium Plan</span>
                            <span className="text-blue-600 font-bold">$9.99/month</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center space-y-6">
          {/* Still Have Questions */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our support team is here to help you understand how Althea can transform your health journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">&lt; 2 min</div>
              <div className="text-gray-600 text-sm">Average response time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Support availability</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-gray-600 text-sm">Question resolution rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
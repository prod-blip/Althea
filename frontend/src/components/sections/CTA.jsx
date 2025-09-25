import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Headline */}
        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 text-white text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Transform Your Health Journey Today</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Take Control of Your Health?
          </h2>
          
          <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Join thousands who've transformed confusion into clarity. Upload your first report and see the difference Althea makes.
          </p>
        </div>

        {/* Value Proposition Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center space-y-3 text-white">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">2 Minutes</div>
              <div className="text-blue-100 text-sm">From upload to insights</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-3 text-white">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">100% Secure</div>
              <div className="text-blue-100 text-sm">HIPAA compliant platform</div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-3 text-white">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">2,000+</div>
              <div className="text-blue-100 text-sm">Happy users worldwide</div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="space-y-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="white" 
              size="lg" 
              className="group shadow-2xl hover:shadow-3xl"
            >
              <span className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="shadow-lg hover:shadow-xl"
            >
              View Sample Report
            </Button>
          </div>
          
          {/* Trust Reinforcement */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-blue-200 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>3 free reports monthly</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Don't Wait for Your Next Medical Report to Confuse You
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Every day you wait is another day of unnecessary health anxiety. Start your journey to medical clarity today.
            </p>
            
            {/* Mini Success Stories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-white text-sm italic">
                      "Wish I had this during my cancer scare. Would have saved weeks of worry."
                    </p>
                    <div className="text-blue-200 text-xs mt-1">- Sarah K.</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-white text-sm italic">
                      "Finally understand my lab work. My doctor was impressed with my questions!"
                    </p>
                    <div className="text-blue-200 text-xs mt-1">- David L.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Push */}
        <div className="mt-8 space-y-3">
          <div className="text-white text-lg font-semibold">
            Take the First Step Toward Health Empowerment
          </div>
          <div className="text-blue-100 text-sm">
            Upload any medical report and experience the clarity you deserve
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black opacity-5"></div>
    </section>
  );
};

export default CTA;
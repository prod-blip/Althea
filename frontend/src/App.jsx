import React from 'react';

// Auth Context
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Benefits from './components/sections/Benefits';
import HowItWorks from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import CTA from './components/sections/CTA';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Hero />
        
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
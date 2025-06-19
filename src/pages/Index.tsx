
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ServiceCarousel from '../components/ServiceCarousel';
import StatsSection from '../components/StatsSection';
import ServiceCards from '../components/ServiceCards';
import ContactSection from '../components/ContactSection';
import LoadingScreen from '../components/LoadingScreen';
import Navigation from '../components/Navigation';
import ScrollButtons from '../components/ScrollButtons';
import { ThemeProvider } from '../components/ThemeProvider';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="servicepro-theme">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors duration-300">
        <Navigation />
        <Hero />
        <ServiceCarousel />
        <StatsSection />
        <ServiceCards />
        <ContactSection />
        <ScrollButtons />
      </div>
    </ThemeProvider>
  );
};

export default Index;

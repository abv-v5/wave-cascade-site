
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Headphones, MessageSquare, Clock, Shield } from 'lucide-react';

const ServiceCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: <Headphones size={48} />,
      title: "24/7 Live Support",
      description: "Round-the-clock assistance from our expert support team",
      features: ["Instant response", "Multi-channel support", "Expert agents"],
      color: "from-blue-500 via-blue-600 to-cyan-500"
    },
    {
      icon: <MessageSquare size={48} />,
      title: "AI-Powered Chat",
      description: "Smart chatbots that understand and resolve issues quickly",
      features: ["Natural language processing", "Instant answers", "Seamless handoff"],
      color: "from-purple-500 via-purple-600 to-pink-500"
    },
    {
      icon: <Clock size={48} />,
      title: "Quick Resolution",
      description: "Average response time under 30 seconds",
      features: ["Fast ticket routing", "Priority handling", "Real-time updates"],
      color: "from-green-500 via-green-600 to-emerald-500"
    },
    {
      icon: <Shield size={48} />,
      title: "Secure & Private",
      description: "Enterprise-grade security for all customer interactions",
      features: ["End-to-end encryption", "GDPR compliant", "Data protection"],
      color: "from-orange-500 via-orange-600 to-red-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="services" className="py-12 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our comprehensive customer service solutions can transform your business
          </p>
        </div>

        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-br ${service.color} text-white p-6 sm:p-12 md:p-20 min-h-[400px] sm:min-h-[500px] flex items-center relative overflow-hidden`}>
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
                      <div className="text-center lg:text-left">
                        <div className="mb-6 flex justify-center lg:justify-start">
                          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                          {service.title}
                        </h3>
                        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90 leading-relaxed">
                          {service.description}
                        </p>
                        <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                          Learn More
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
                            style={{ animationDelay: `${featureIndex * 0.1}s` }}
                          >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span className="text-base sm:text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
          >
            <ChevronLeft size={20} className="text-gray-800 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group"
          >
            <ChevronRight size={20} className="text-gray-800 group-hover:scale-110 transition-transform" />
          </button>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  currentSlide === index 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;

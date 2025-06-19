
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Headphones, MessageSquare, Clock, Shield } from 'lucide-react';

const ServiceCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const services = [
    {
      icon: <Headphones size={48} />,
      title: "24/7 Live Support",
      description: "Round-the-clock assistance from our expert support team",
      features: ["Instant response", "Multi-channel support", "Expert agents"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MessageSquare size={48} />,
      title: "AI-Powered Chat",
      description: "Smart chatbots that understand and resolve issues quickly",
      features: ["Natural language processing", "Instant answers", "Seamless handoff"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock size={48} />,
      title: "Quick Resolution",
      description: "Average response time under 30 seconds",
      features: ["Fast ticket routing", "Priority handling", "Real-time updates"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield size={48} />,
      title: "Secure & Private",
      description: "Enterprise-grade security for all customer interactions",
      features: ["End-to-end encryption", "GDPR compliant", "Data protection"],
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our comprehensive customer service solutions can transform your business
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-br ${service.color} text-white p-12 md:p-20 min-h-[500px] flex items-center`}>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                      <div className="text-center md:text-left">
                        <div className="mb-6 flex justify-center md:justify-start">
                          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                            {service.icon}
                          </div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                          {service.title}
                        </h3>
                        <p className="text-xl mb-8 text-white/90">
                          {service.description}
                        </p>
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                          Learn More
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
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


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Headphones, Clock, Users, Star, Zap } from 'lucide-react';

const ServiceCards = () => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  const services = [
    {
      icon: MessageSquare,
      title: '24/7 Live Chat',
      description: 'Instant support through our intelligent chat system',
      details: 'Our AI-powered chat system provides immediate responses to common queries, while seamlessly connecting complex issues to our expert human agents.',
      features: ['AI-powered responses', 'Human escalation', 'Multi-language support'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Direct access to our expert support team',
      details: 'Connect with our certified support specialists through our toll-free number. Average wait time under 30 seconds.',
      features: ['Toll-free calling', '<30s wait time', 'Expert technicians'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Average response time under 5 minutes',
      details: 'We prioritize speed without compromising quality. Our streamlined processes ensure rapid issue resolution.',
      features: ['5-minute response', 'Priority queuing', 'Status tracking'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Coordinated support across departments',
      details: 'Our integrated team approach ensures that complex issues are handled by the right specialists working together.',
      features: ['Cross-department coordination', 'Specialist teams', 'Unified communication'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: 'White-glove treatment for enterprise clients',
      details: 'Dedicated account managers, priority support channels, and custom service level agreements for our premium clients.',
      features: ['Dedicated managers', 'Custom SLAs', 'Priority channels'],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Automated Solutions',
      description: 'Smart automation for common issues',
      details: 'Our intelligent automation handles routine tasks instantly, freeing up human agents for complex problem-solving.',
      features: ['Instant automation', 'Smart routing', 'Self-service options'],
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElements = document.querySelectorAll('.service-card');
    cardElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const createRipple = (event: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(card.clientWidth, card.clientHeight);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, id: Date.now() + cardIndex };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <section id="about" className="py-12 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Comprehensive customer service solutions designed to exceed expectations
            and drive customer satisfaction to new heights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`service-card relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg group ${
                expandedCard === index ? 'sm:col-span-2 lg:col-span-1' : ''
              } ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: `${index * 0.1}s`
              }}
              onClick={(e) => {
                createRipple(e, index);
                setExpandedCard(expandedCard === index ? null : index);
              }}
            >
              {/* Enhanced Ripple Effect */}
              {ripples
                .filter(ripple => ripple.id.toString().endsWith(index.toString()))
                .map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute bg-blue-400/30 rounded-full animate-ping pointer-events-none z-10"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: '120px',
                      height: '120px',
                    }}
                  />
                ))}

              <CardHeader className="relative z-20">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-br ${service.gradient} rounded-xl text-white group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-20">
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
                  {service.details}
                </p>
                
                {expandedCard === index && (
                  <div className="animate-fade-in">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full mr-3 animate-pulse`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white transition-all duration-300 hover:scale-105 shadow-lg`}>
                      Learn More
                    </Button>
                  </div>
                )}
              </CardContent>

              {/* Enhanced Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;

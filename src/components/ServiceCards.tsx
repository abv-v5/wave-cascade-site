
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Headphones, Clock, Users, Star, Zap } from 'lucide-react';

const ServiceCards = () => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services = [
    {
      icon: MessageSquare,
      title: '24/7 Live Chat',
      description: 'Instant support through our intelligent chat system',
      details: 'Our AI-powered chat system provides immediate responses to common queries, while seamlessly connecting complex issues to our expert human agents.',
      features: ['AI-powered responses', 'Human escalation', 'Multi-language support']
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Direct access to our expert support team',
      details: 'Connect with our certified support specialists through our toll-free number. Average wait time under 30 seconds.',
      features: ['Toll-free calling', '<30s wait time', 'Expert technicians']
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Average response time under 5 minutes',
      details: 'We prioritize speed without compromising quality. Our streamlined processes ensure rapid issue resolution.',
      features: ['5-minute response', 'Priority queuing', 'Status tracking']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Coordinated support across departments',
      details: 'Our integrated team approach ensures that complex issues are handled by the right specialists working together.',
      features: ['Cross-department coordination', 'Specialist teams', 'Unified communication']
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: 'White-glove treatment for enterprise clients',
      details: 'Dedicated account managers, priority support channels, and custom service level agreements for our premium clients.',
      features: ['Dedicated managers', 'Custom SLAs', 'Priority channels']
    },
    {
      icon: Zap,
      title: 'Automated Solutions',
      description: 'Smart automation for common issues',
      details: 'Our intelligent automation handles routine tasks instantly, freeing up human agents for complex problem-solving.',
      features: ['Instant automation', 'Smart routing', 'Self-service options']
    }
  ];

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
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in">
            Comprehensive customer service solutions designed to exceed expectations
            and drive customer satisfaction to new heights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-fade-in group ${
                expandedCard === index ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={(e) => {
                createRipple(e, index);
                setExpandedCard(expandedCard === index ? null : index);
              }}
            >
              {/* Ripple Effect */}
              {ripples
                .filter(ripple => ripple.id.toString().endsWith(index.toString()))
                .map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute bg-blue-400/30 rounded-full animate-ping pointer-events-none"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: '100px',
                      height: '100px',
                    }}
                  />
                ))}

              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {service.details}
                </p>
                
                {expandedCard === index && (
                  <div className="animate-fade-in">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                    <ul className="space-y-1 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Learn More
                    </Button>
                  </div>
                )}
              </CardContent>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
      `}</style>
    </section>
  );
};

export default ServiceCards;

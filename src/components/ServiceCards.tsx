
import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Video, Globe, Shield, Clock, Star } from 'lucide-react';

const ServiceCards = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const services = [
    {
      icon: <Phone size={40} />,
      title: "Voice Support",
      description: "Professional phone support with human agents",
      features: ["24/7 availability", "Multi-language support", "Call recording", "Quality assurance"],
      price: "$29/month",
      color: "from-blue-500 to-blue-600",
      popular: false
    },
    {
      icon: <MessageCircle size={40} />,
      title: "Live Chat",
      description: "Real-time chat support with instant responses",
      features: ["Instant messaging", "File sharing", "Chat history", "Agent handoff"],
      price: "$19/month",
      color: "from-green-500 to-green-600",
      popular: true
    },
    {
      icon: <Mail size={40} />,
      title: "Email Support",
      description: "Professional email support with quick turnaround",
      features: ["48-hour response", "Rich formatting", "Attachment support", "Auto-replies"],
      price: "$15/month",
      color: "from-purple-500 to-purple-600",
      popular: false
    },
    {
      icon: <Video size={40} />,
      title: "Video Support",
      description: "Face-to-face support for complex issues",
      features: ["HD video calls", "Screen sharing", "Recording", "Virtual whiteboard"],
      price: "$49/month",
      color: "from-red-500 to-red-600",
      popular: false
    },
    {
      icon: <Globe size={40} />,
      title: "Global Support",
      description: "Worldwide coverage in multiple time zones",
      features: ["150+ countries", "Local phone numbers", "Cultural awareness", "Time zone coverage"],
      price: "$99/month",
      color: "from-indigo-500 to-indigo-600",
      popular: false
    },
    {
      icon: <Shield size={40} />,
      title: "Enterprise Security",
      description: "Advanced security for enterprise customers",
      features: ["End-to-end encryption", "GDPR compliance", "SOC 2 certified", "Data residency"],
      price: "$199/month",
      color: "from-gray-600 to-gray-700",
      popular: false
    }
  ];

  const handleCardClick = (index: number, event: React.MouseEvent) => {
    // Create ripple effect
    const card = event.currentTarget as HTMLElement;
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    const rippleContainer = card.querySelector('.ripple-container');
    if (rippleContainer) {
      rippleContainer.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive customer service solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCard === index ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
              onClick={(e) => handleCardClick(index, e)}
            >
              {/* Ripple container */}
              <div className="ripple-container absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"></div>
              
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star size={16} className="mr-1" />
                  Popular
                </div>
              )}

              {/* Card header */}
              <div className={`bg-gradient-to-br ${service.color} text-white p-8`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{service.title}</h3>
                <p className="text-center text-white/90">{service.description}</p>
              </div>

              {/* Card body */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">{service.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                  Get Started
                </button>
              </div>

              {/* Expanded content */}
              {selectedCard === index && (
                <div className="border-t border-gray-200 p-6 bg-gray-50 animate-fade-in">
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Benefits:</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-blue-500" />
                      Fast setup
                    </div>
                    <div className="flex items-center">
                      <Shield size={16} className="mr-2 text-green-500" />
                      Secure & reliable
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-xl mb-8 text-white/90">
              Contact our enterprise team for tailored pricing and features
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceCards;

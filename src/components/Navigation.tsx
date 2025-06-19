
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Stats', href: '#stats' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`text-xl sm:text-2xl font-bold transition-all duration-300 cursor-pointer hover:scale-105 ${
              isScrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white'
            }`} onClick={() => handleNavClick('#home')}>
              ServicePro
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:scale-105 ${
                    isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info and theme toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className={`hidden xl:flex items-center space-x-1 transition-colors duration-300 ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white'}`}>
              <Phone size={14} />
              <span className="text-xs">1-800-SERVICE</span>
            </div>
            <div className={`hidden xl:flex items-center space-x-1 transition-colors duration-300 ${isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white'}`}>
              <Mail size={14} />
              <span className="text-xs">help@servicepro.com</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile contact info */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300">
                <Phone size={16} />
                <span className="text-sm">1-800-SERVICE</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300">
                <Mail size={16} />
                <span className="text-sm">help@servicepro.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

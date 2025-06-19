
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ScrollButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const [isScrollingToBottom, setIsScrollingToBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show buttons when scrolled more than 300px and not at the very bottom
      setShowButtons(scrollPosition > 300 && scrollPosition < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsScrollingToTop(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => setIsScrollingToTop(false), 1000);
  };

  const scrollToBottom = () => {
    setIsScrollingToBottom(true);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
    setTimeout(() => setIsScrollingToBottom(false), 1000);
  };

  if (!showButtons) return null;

  return (
    <div className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 flex flex-col gap-3 z-50">
      <Button
        onClick={scrollToTop}
        size="icon"
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 group ${
          isScrollingToTop ? 'animate-bounce' : ''
        }`}
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
      </Button>
      <Button
        onClick={scrollToBottom}
        size="icon"
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 group ${
          isScrollingToBottom ? 'animate-bounce' : ''
        }`}
      >
        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
      </Button>
    </div>
  );
};

export default ScrollButtons;

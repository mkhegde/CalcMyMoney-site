import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                We Use Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                We use cookies to enhance your experience, analyze site usage, and assist with our marketing efforts. 
                Your data is processed in your browser - we don't store any of your financial calculations on our servers.
                <br />
                <a href="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Learn more about our cookies
                </a>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700">
                  Accept All Cookies
                </Button>
                <Button variant="outline" onClick={handleDecline}>
                  Decline
                </Button>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleDecline}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
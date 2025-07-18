import React from 'react';
import { Github, Linkedin, ArrowUpRight, Sun, Moon } from 'lucide-react';

// Performance monitoring
const usePerformanceMonitor = () => {
  React.useEffect(() => {
    // Track page load performance
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('Page load time:', navEntry.loadEventEnd - navEntry.loadEventStart, 'ms');
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }, []);
};

// Keyboard navigation hook
const useKeyboardNavigation = (onToggle: () => void) => {
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'd' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggle]);
};

// Accessibility hook for reduced motion
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [isLoaded, setIsLoaded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Performance monitoring
  usePerformanceMonitor();
  
  // Keyboard shortcuts
  useKeyboardNavigation(() => setIsDarkMode(!isDarkMode));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Save preference to localStorage
  React.useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Track analytics
  React.useEffect(() => {
    // Simple analytics tracking
    const trackEvent = (event: string) => {
      console.log(`Analytics: ${event} at ${new Date().toISOString()}`);
      // In a real app, you'd send this to your analytics service
    };
    
    trackEvent('page_view');
    
    // Track dark mode usage
    if (isDarkMode) {
      trackEvent('dark_mode_enabled');
    }
  }, [isDarkMode]);

  // Developer console welcome message
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`
%c🚀 Welcome to Chris Mahlke's Portfolio!
%c
%cBuilt with React, TypeScript & Tailwind CSS
%cFeatures: Dark mode, PWA, Accessibility, Error handling
%c
%cPress ⌘+D to toggle dark mode
%c
%cGitHub: https://github.com/ChrisMahlke
%cLinkedIn: https://www.linkedin.com/in/chris-mahlke
      `, 
        'color: #3b82f6; font-size: 18px; font-weight: bold;',
        '',
        'color: #6b7280; font-size: 14px;',
        'color: #6b7280; font-size: 14px;',
        '',
        'color: #10b981; font-size: 14px;',
        '',
        'color: #6b7280; font-size: 12px;',
        'color: #6b7280; font-size: 12px;'
      );
    }
  }, []);

  // Simulate loading state for better UX
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ChrisMahlke',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chris-mahlke',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    }
  ];

  if (!isLoaded) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
      }`}>
        <div className="animate-pulse" role="status" aria-live="polite">Loading...</div>
      </div>
    );
  }

  return (
    <div 
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
            : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
        }`}
        role="application"
        aria-label="Personal homepage"
      >
        {/* Header with dark mode toggle */}
        <header className="absolute top-0 right-0 p-6" role="banner">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title="Toggle dark mode (⌘+D)"
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>
        </header>

        <main 
          id="main-content"
          ref={mainContentRef}
          className="flex items-center justify-center min-h-screen p-8" 
          role="main"
          tabIndex={-1}
        >
          <div ref={containerRef} className="max-w-2xl w-full text-center">
            {/* Social Links */}
            <nav 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
              role="navigation"
              aria-label="Social media links"
            >
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
                      isDarkMode 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-700 hover:text-gray-900'
                    } ${link.color}`}
                    aria-label={`Visit ${link.name} (opens in new window)`}
                    style={{ 
                      animationDelay: prefersReducedMotion ? '0ms' : `${index * 100}ms`,
                      animation: prefersReducedMotion ? 'none' : undefined
                    }}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{link.name}</span>
                    <ArrowUpRight 
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>

            {/* Footer */}
            <footer 
              className={`mt-12 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
              role="contentinfo"
            >
              <p>Built with React, TypeScript & Tailwind CSS</p>
              <p className="mt-1 text-xs opacity-60">Press ⌘+D to toggle theme</p>
            </footer>
          </div>
        </main>
      </div>
  );
}

export default App;
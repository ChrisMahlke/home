import { ArrowUpRight, Github, Linkedin, Moon, Sun } from 'lucide-react';
import React from 'react';

import { useCloudStrings } from './hooks/use-cloud-strings';

function App(): React.JSX.Element {
  const { strings, loading, error } = useCloudStrings();

  // All hooks at the top - must be called unconditionally
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLElement>(null);

  // Custom hooks that depend on strings - but we need to handle the case where strings is null
  const usePerformanceMonitor = (): void => {
    React.useEffect(() => {
      if (!strings) return; // Early return if strings not loaded
      
      if ('performance' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === strings.performanceEntryTypes.navigation) {
              const navEntry = entry as PerformanceNavigationTiming;
              const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart;
              // eslint-disable-next-line no-console
              console.log(strings.performance.pageLoadTime, loadTime, 'ms');
            }
          }
        });
        observer.observe({ entryTypes: [strings.performanceEntryTypes.navigation] });
      }
    }, [strings?.performanceEntryTypes?.navigation, strings?.performance?.pageLoadTime]);
  };

  const useKeyboardNavigation = (onToggle: () => void): void => {
    React.useEffect(() => {
      if (!strings) return; // Early return if strings not loaded
      
      const handleKeyPress = (event: KeyboardEvent): void => {
        if (event.key === strings.keyboard.keyD && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          onToggle();
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return (): void => window.removeEventListener('keydown', handleKeyPress);
    }, [strings?.keyboard?.keyD, onToggle]);
  };

  const useReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    React.useEffect((): (() => void) => {
      if (!strings) return () => {}; // Early return if strings not loaded
      
      const mediaQuery = window.matchMedia(strings.mediaQueries.reducedMotion);
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent): void => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, [strings?.mediaQueries?.reducedMotion]);
    return prefersReducedMotion;
  };

  // Call all hooks unconditionally
  usePerformanceMonitor();
  useKeyboardNavigation(() => setIsDarkMode(!isDarkMode));
  const prefersReducedMotion = useReducedMotion();

  // All useEffect hooks must be at the top level
  React.useEffect((): void => {
    if (!strings) return; // Early return if strings not loaded
    
    localStorage.setItem(strings.localStorage.darkMode, JSON.stringify(isDarkMode));
  }, [isDarkMode, strings?.localStorage?.darkMode]);

  // Track analytics
  React.useEffect((): void => {
    if (!strings) return; // Early return if strings not loaded
    
    // Simple analytics tracking
    const trackEvent = (event: string): void => {
      // eslint-disable-next-line no-console
      console.log(`Analytics: ${event} at ${new Date().toISOString()}`);
      // In a real app, you'd send this to your analytics service
    };
    
    trackEvent(strings.analytics.pageView);
    
    // Track dark mode usage
    if (isDarkMode) {
      trackEvent(strings.analytics.darkModeEnabled);
    }
  }, [isDarkMode, strings?.analytics?.pageView, strings?.analytics?.darkModeEnabled]);

  // Developer console welcome message
  React.useEffect((): void => {
    if (!strings || !import.meta.env.DEV) return; // Early return if strings not loaded or not dev
    
    // eslint-disable-next-line no-console
    console.log(`
%c${strings.console.welcome}
%c
%c${strings.console.builtWith}
%c${strings.console.features}
%c
%c${strings.console.keyboardShortcut}
%c
%c${strings.console.github}
%c${strings.console.linkedin}
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
  }, [strings?.console?.welcome, strings?.console?.builtWith, strings?.console?.features, strings?.console?.keyboardShortcut, strings?.console?.github, strings?.console?.linkedin]);

  // Simulate loading state for better UX
  React.useEffect((): (() => void) => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Only after all hooks, do your early returns:
  if (loading || !strings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading strings from cloud...</div>
      </div>
    );
  }

  // Show error state with fallback
  if (error) {
    // eslint-disable-next-line no-console
    console.warn('Using fallback strings due to error:', error);
  }

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const socialLinks = [
    {
      name: strings.social.github.name,
      url: strings.social.github.url,
      icon: Github,
      color: strings.social.github.color
    },
    {
      name: strings.social.linkedin.name,
      url: strings.social.linkedin.url,
      icon: Linkedin,
      color: strings.social.linkedin.color
    }
  ];

  if (!isLoaded) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
      }`}>
        <div className="animate-pulse" role="status" aria-live={strings.ui.loadingStatus as 'polite' | 'off' | 'assertive'}>{strings.ui.loading}</div>
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
        role={strings.app.role}
        aria-label={strings.ui.personalHomepage}
      >
        {/* Header with dark mode toggle */}
        <header className="absolute top-0 right-0 p-6" role={strings.ui.banner}>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={`Switch to ${isDarkMode ? strings.theme.toggle.switchToLight : strings.theme.toggle.switchToDark} mode`}
            title={strings.theme.toggle.title}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>
        </header>

        <main 
          id={strings.navigation.mainContent}
          ref={mainContentRef}
          className="flex items-center justify-center min-h-screen p-8" 
          role={strings.ui.main}
          tabIndex={-1}
        >
          <div ref={containerRef} className="max-w-2xl w-full text-center">
            {/* Social Links */}
            <nav 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
              role="navigation"
              aria-label={strings.navigation.socialLinks}
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
                    aria-label={link.name === strings.social.github.name ? strings.social.github.ariaLabel : strings.social.linkedin.ariaLabel}
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
              role={strings.ui.contentInfo}
            >
              <p>{strings.footer.builtWith}</p>
              <p className="mt-1 text-xs opacity-60">{strings.theme.toggle.keyboardShortcut}</p>
            </footer>
          </div>
        </main>
      </div>
  );
}

export default App;
import { ArrowUpRight, Github, Linkedin, Moon, Sun } from 'lucide-react';
import React from 'react';

import strings from './strings.json';
import type { Strings } from './types/strings';

const typedStrings: Strings = strings;

function App(): React.JSX.Element {
  // All hooks at the top - must be called unconditionally
  const [isDarkMode, setIsDarkMode] = React.useState(true); // Changed to true for dark mode default
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainContentRef = React.useRef<HTMLElement>(null);

  // Memoized social links to prevent unnecessary re-renders
  const socialLinks = React.useMemo(() => [
    {
      name: typedStrings.social.github.name,
      url: typedStrings.social.github.url,
      icon: Github,
      color: typedStrings.social.github.color
    },
    {
      name: typedStrings.social.linkedin.name,
      url: typedStrings.social.linkedin.url,
      icon: Linkedin,
      color: typedStrings.social.linkedin.color
    }
  ], []);

  // Memoized theme classes to prevent recalculation
  const themeClasses = React.useMemo(() => {
    return {
      container: `min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
      }`,
      button: `p-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800/90 text-yellow-400 hover:bg-gray-700 active:bg-gray-600 backdrop-blur-sm' 
          : 'bg-white/90 text-gray-600 hover:bg-gray-100 active:bg-gray-200 backdrop-blur-sm'
      }`,
      link: (isDark: boolean): string => `flex items-center gap-2 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 ${
        isDark 
          ? 'text-gray-300 hover:text-white' 
          : 'text-gray-700 hover:text-gray-900'
      }`,
      footer: `mt-12 text-sm transition-colors duration-300 ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`
    };
  }, [isDarkMode]);

  // Memoized toggle function to prevent unnecessary re-renders
  const toggleDarkMode = React.useCallback((): void => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Custom hooks that depend on strings
  const usePerformanceMonitor = (): void => {
    React.useEffect(() => {
      if ('performance' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === typedStrings.performanceEntryTypes.navigation) {
              // Performance tracking - removed console.log
            }
          }
        });
        observer.observe({ entryTypes: [typedStrings.performanceEntryTypes.navigation] });
      }
    }, []);
  };

  const useKeyboardNavigation = (onToggle: () => void): void => {
    React.useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent): void => {
        if (event.key === typedStrings.keyboard.keyD && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          onToggle();
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return (): void => window.removeEventListener('keydown', handleKeyPress);
    }, [onToggle]);
  };

  const useReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    React.useEffect((): (() => void) => {
      const mediaQuery = window.matchMedia(typedStrings.mediaQueries.reducedMotion);
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent): void => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    return prefersReducedMotion;
  };

  // Call all hooks unconditionally
  usePerformanceMonitor();
  useKeyboardNavigation(toggleDarkMode);
  const prefersReducedMotion = useReducedMotion();

  // All useEffect hooks must be at the top level
  React.useEffect((): void => {
    localStorage.setItem(typedStrings.localStorage.darkMode, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Track analytics
  React.useEffect((): void => {
    // Analytics tracking removed - in a real app, you'd send this to your analytics service
  }, [isDarkMode]);

  // Simulate loading state for better UX
  React.useEffect((): (() => void) => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized loading component
  const LoadingComponent = React.useMemo(() => (
    <div className={themeClasses.container}>
      <div className="animate-pulse" role="status" aria-live={typedStrings.ui.loadingStatus as 'polite' | 'off' | 'assertive'}>{typedStrings.ui.loading}</div>
    </div>
  ), [themeClasses.container]);

  if (!isLoaded) {
    return LoadingComponent;
  }

  return (
    <div 
        className={themeClasses.container}
        role={typedStrings.app.role}
        aria-label={typedStrings.ui.personalHomepage}
      >
        {/* Header with dark mode toggle */}
        <header className="fixed top-0 right-0 p-4 z-50" role={typedStrings.ui.banner}>
          <button
            onClick={toggleDarkMode}
            className={`${themeClasses.button} touch-manipulation`}
            aria-label={`Switch to ${isDarkMode ? typedStrings.theme.toggle.switchToLight : typedStrings.theme.toggle.switchToDark} mode`}
            title={typedStrings.theme.toggle.title}
            aria-pressed={isDarkMode}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'manipulation',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
            {isDarkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>
        </header>

        <main 
          id={typedStrings.navigation.mainContent}
          ref={mainContentRef}
          className="flex items-center justify-center min-h-screen p-8 relative z-10" 
          role={typedStrings.ui.main}
          tabIndex={-1}
        >
          <div ref={containerRef} className="max-w-2xl w-full text-center">
            {/* Social Links */}
            <nav 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center" 
              role="navigation"
              aria-label={typedStrings.navigation.socialLinks}
            >
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.name}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${themeClasses.link(isDarkMode)} ${link.color}`}
                    aria-label={link.name === typedStrings.social.github.name ? typedStrings.social.github.ariaLabel : typedStrings.social.linkedin.ariaLabel}
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
              className={themeClasses.footer}
              role={typedStrings.ui.contentInfo}
            >
              <p>{typedStrings.footer.builtWith}</p>
              <p className="mt-1 text-xs opacity-60">{typedStrings.theme.toggle.keyboardShortcut}</p>
            </footer>
          </div>
        </main>
      </div>
  );
}

export default React.memo(App);
import { useState, useEffect } from 'react';

// Network Information API types
interface NetworkInformation {
  type?: string;
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NetworkStatus {
  isOnline: boolean;
  connectionType?: string;
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
}

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
  });

  useEffect((): (() => void) => {
    const updateNetworkStatus = (): void => {
      const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
      
      setNetworkStatus({
        isOnline: navigator.onLine,
        connectionType: connection?.type,
        downlink: connection?.downlink,
        effectiveType: connection?.effectiveType,
        rtt: connection?.rtt,
      });
    };

    // Update on mount
    updateNetworkStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for connection changes (if supported)
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
};

export const usePerformanceMonitor = (): PerformanceMetrics | null => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect((): (() => void) => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const paintEntries = performance.getEntriesByType('paint');
            
            const firstPaint = paintEntries.find(paintEntry => paintEntry.name === 'first-paint');
            const firstContentfulPaint = paintEntries.find(paintEntry => paintEntry.name === 'first-contentful-paint');
            
            const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
            const lcp = lcpEntries[lcpEntries.length - 1];
            
            const newMetrics = {
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              firstPaint: firstPaint ? firstPaint.startTime : 0,
              firstContentfulPaint: firstContentfulPaint ? firstContentfulPaint.startTime : 0,
              largestContentfulPaint: lcp ? lcp.startTime : 0,
            };
            
            setMetrics(newMetrics);
            
            // Log detailed performance metrics in development
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console
              console.log(`%c📊 Performance Metrics:`, 'color: #f59e0b; font-weight: bold;', newMetrics);
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      
      return () => observer.disconnect();
    }
    
    return () => {
      // No cleanup needed if performance API is not available
    };
  }, []);

  return metrics;
}; 
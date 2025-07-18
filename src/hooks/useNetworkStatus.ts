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

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
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
// src/hooks/use-cloud-strings.ts
import { useState, useEffect } from 'react';

import fallbackStrings from '../strings.json';
import type { Strings } from '../types/strings';

interface UseCloudStringsReturn {
  strings: Strings | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// GCP Configuration - SAFE ISOLATED SETUP
const GCP_CONFIG = {
  // Cloud Storage URL with cache busting
  STORAGE_URL: 'https://storage.googleapis.com/chrismahlke-homepage-strings-71027948544/strings.json',
  
  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  POLLING_INTERVAL: 10 * 60 * 1000, // 10 minutes
};

export const useCloudStrings = (): UseCloudStringsReturn => {
  const [strings, setStrings] = useState<Strings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStrings = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // TEMPORARY: Use local strings while debugging CORS
      const useLocalStrings = false; // Enable cloud strings for production
      
      if (useLocalStrings) {
        setStrings(fallbackStrings);
        setLoading(false);
        return;
      }

      // Check cache first
      const cached = localStorage.getItem('cloud-strings-cache');
      const cacheTime = localStorage.getItem('cloud-strings-cache-time');
      
      if (cached && cacheTime) {
        const age = Date.now() - Number.parseInt(cacheTime, 10);
        if (age < GCP_CONFIG.CACHE_DURATION) {
          setStrings(JSON.parse(cached) as Strings);
          setLoading(false);
          return;
        }
      }

      // Fetch from GCP Cloud Storage with cache busting
      const url = `${GCP_CONFIG.STORAGE_URL}?t=${Date.now()}`;
      
      // Try to fetch with different approaches
      let response: Response;
      
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
          mode: 'cors',
        });
      } catch (fetchError) {
        // eslint-disable-next-line no-console
        console.warn('CORS fetch failed, trying without mode:', fetchError);
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          },
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const stringsData = await response.json() as Strings;
      
      // Validate the data structure
      if (!stringsData.app || !stringsData.social) {
        throw new Error('Invalid strings data structure');
      }

      setStrings(stringsData);

      // Cache the result
      localStorage.setItem('cloud-strings-cache', JSON.stringify(stringsData));
      localStorage.setItem('cloud-strings-cache-time', Date.now().toString());

    } catch (error_) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch strings from GCP, using fallback:', error_);
      setStrings(fallbackStrings);
      setError(error_ instanceof Error ? error_.message : 'Failed to fetch strings');
    } finally {
      setLoading(false);
    }
  };

  const refetch = (): void => {
    fetchStrings().catch((fetchError) => {
      // eslint-disable-next-line no-console
      console.error('Failed to refetch strings:', fetchError);
    });
  };

  useEffect((): (() => void) => {
    // Initial fetch
    fetchStrings().catch((fetchError) => {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch strings on mount:', fetchError);
    });

    // Set up polling for updates
    const interval = setInterval((): void => {
      fetchStrings().catch((fetchError) => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch strings during polling:', fetchError);
      });
    }, GCP_CONFIG.POLLING_INTERVAL);

    return (): void => clearInterval(interval);
  }, []);

  return { strings, loading, error, refetch };
};
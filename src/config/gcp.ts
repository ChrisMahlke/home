// src/config/gcp.ts
export const GCP_CONFIG = {
    // SAFE ISOLATED BUCKET - Won't interfere with existing resources
    STORAGE: {
      BUCKET_NAME: 'chrismahlke-homepage-strings-71027948544',
      PROJECT_ID: 'helpful-quanta-463702-a3',
      FILE_NAME: 'strings.json',
      PUBLIC_URL: 'https://storage.googleapis.com/chrismahlke-homepage-strings-71027948544/strings.json',
    },
    
    // Cache settings
    CACHE: {
      DURATION: 5 * 60 * 1000, // 5 minutes
      POLLING_INTERVAL: 10 * 60 * 1000, // 10 minutes
    },
    
    // Environment variables
    ENV: {
      BUCKET_NAME: (import.meta.env.VITE_GCP_BUCKET_NAME as string) ?? 'chrismahlke-homepage-strings-71027948544',
      PROJECT_ID: (import.meta.env.VITE_GCP_PROJECT_ID as string) ?? 'helpful-quanta-463702-a3',
    },
  };
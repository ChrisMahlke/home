import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // eslint-disable-next-line no-console
        console.log('SW registered:', registration);
        return registration;
      })
      .catch((registrationError) => {
        // eslint-disable-next-line no-console
        console.log('SW registration failed:', registrationError);
      });
  });
}

const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

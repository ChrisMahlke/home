import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

// Performance optimization: Preload critical resources
const preloadCriticalResources = (): void => {
  // Preload critical CSS
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "style";
  link.href = "/src/index.css";
  document.head.appendChild(link);

  // Preload critical fonts (if any)
  // const fontLink = document.createElement('link');
  // fontLink.rel = 'preload';
  // fontLink.as = 'font';
  // fontLink.crossOrigin = 'anonymous';
  // fontLink.href = '/fonts/your-font.woff2';
  // document.head.appendChild(fontLink);
};

// Performance optimization: Register service worker with better error handling
const registerServiceWorker = async (): Promise<void> => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none", // Always check for updates
      });

      // Handle service worker updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New service worker available
              // You could show a notification to the user here
            }
          });
        }
      });

      // Handle service worker activation
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // Service worker has taken control
        window.location.reload();
      });
    } catch {
      // Service worker registration failed - app will still work
    }
  }
};

// Performance optimization: Initialize app with better error handling
const initializeApp = async (): Promise<void> => {
  try {
    // Preload critical resources
    preloadCriticalResources();

    // Register service worker
    await registerServiceWorker();

    // Find root element
    const rootElement = document.querySelector("#root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    // Create root and render app
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch {
    // Fallback error handling - removed console.error for production
    // In production, send to error tracking service instead

    // Show a basic error message to the user
    const rootElement = document.querySelector("#root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, sans-serif;">
          <div style="text-align: center; padding: 2rem;">
            <h1 style="color: #ef4444; margin-bottom: 1rem;">Something went wrong</h1>
            <p style="color: #6b7280; margin-bottom: 1rem;">We're sorry, but something unexpected happened.</p>
            <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">
              Try Again
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeApp().catch(() => {
      // Error handling removed - in production, send to error tracking service
    });
  });
} else {
  initializeApp().catch(() => {
    // Error handling removed - in production, send to error tracking service
  });
}

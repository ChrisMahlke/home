import React from "react";

import strings from "./strings.json";
import type { Strings } from "./types/strings";

const typedStrings: Strings = strings;

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Store error info for potential analytics service integration
    // In a real app, you'd send this to your error tracking service
    // Example: Sentry.captureException(error, { extra: errorInfo });

    // Error logging removed - in production, send to error tracking service
    this.setState({ error, errorInfo });
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render(): React.JSX.Element {
    if (this.state.hasError) {
      // Custom fallback component
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
          <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">{typedStrings.error.icon}</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {typedStrings.error.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{typedStrings.error.message}</p>

              {import.meta.env.DEV && this.state.error && (
                <details className="text-left mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {typedStrings.error.detailsTitle}
                  </summary>
                  <pre className="text-red-600 dark:text-red-400 overflow-auto">
                    {this.state.error.message}
                    {"\n"}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  onClick={this.resetError}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {typedStrings.error.tryAgain}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {typedStrings.error.refreshPage}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.JSX.Element;
  }
}

export default ErrorBoundary;

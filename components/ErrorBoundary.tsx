
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-red-600">Something went wrong.</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-8">We encountered an unexpected error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-600 transition-all"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

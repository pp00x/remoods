import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-red-500/10 rounded-lg border border-red-500/50">
          <h2 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h2>
          <p className="text-white/80">Please refresh the page and try again</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
import * as React from 'react';

export interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: Object) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: boolean) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch (error: any, info: any) {
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<h1>Has something went wrong.</h1>);
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
"use client";
import React from "react";
import { TEXT } from "../../constants/text";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      errorMessage: "",
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>{TEXT.errorBoundary.heading}</h2>
          <p>{this.state.errorMessage || TEXT.errorBoundary.fallbackMessage}</p>
          <button onClick={this.handleReset}>{TEXT.catalog.tryAgainBtn}</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

"use client";
import React from "react";
import { useTranslations } from "next-intl";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  heading: string;
  fallbackMessage: string;
  tryAgainBtn: string;
}

class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
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
          <h2>{this.props.heading}</h2>
          <p>{this.state.errorMessage || this.props.fallbackMessage}</p>
          <button onClick={this.handleReset}>{this.props.tryAgainBtn}</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCatalog = useTranslations("catalog");
  const tError = useTranslations("errorBoundary");

  return (
    <ErrorBoundaryClass
      heading={tError("heading")}
      fallbackMessage={tError("fallbackMessage")}
      tryAgainBtn={tCatalog("tryAgainBtn")}
    >
      {children}
    </ErrorBoundaryClass>
  );
}

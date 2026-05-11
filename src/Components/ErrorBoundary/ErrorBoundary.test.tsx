import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowError = ({ message } : {message: string}) => {
  throw new Error(message);
};

describe( 'ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it ( 'must pull mistake notice and button reset after error', () => {
    const errorMessage = 'Test Crash';

    render (
      <ErrorBoundary>
        <ThrowError message={errorMessage} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /try again/i})).toBeInTheDocument();
  });
  
  it('reset error and render new content', () => {

  const { rerender } = render(
    <ErrorBoundary>
      <ThrowError message="Error" />
    </ErrorBoundary>
  );

  expect(screen.getByText('Something went wrong')).toBeInTheDocument();

  rerender(
    <ErrorBoundary>
      <div>Safe Content</div>
    </ErrorBoundary>
  );

  const button = screen.getByRole('button', { name: /try again/i });
  fireEvent.click(button);

  expect(screen.getByText('Safe Content')).toBeInTheDocument();
  expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('render without error', () => {
    render(
      <ErrorBoundary>
        <span>No Error Here</span>
      </ErrorBoundary>
    );

    expect(screen.getByText('No Error Here')).toBeInTheDocument();
  });
});

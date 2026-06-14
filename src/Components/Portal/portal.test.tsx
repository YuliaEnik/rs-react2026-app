import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Portal } from './portal';

describe('Portal Component Accessibility', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render nothing when isOpen is false', () => {
    render(
      <Portal isOpen={false} onClose={mockOnClose}>
        <div data-testid="content">Inside Portal</div>
      </Portal>
    );

    expect(screen.queryByTestId('content')).toBeNull();
  });

  it('should render content inside document.body and autofocus the close button', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div data-testid="content">Inside Portal</div>
      </Portal>
    );

    expect(screen.getByTestId('content')).not.toBeNull();

    act(() => {
      vi.runAllTimers();
    });

    const closeButton = screen.getByRole('button', { name: /Close portal/i });
    expect(document.activeElement).toBe(closeButton);
  });

  it('should call onClose when clicking on the overlay backdrop', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Portal>
    );

    const overlay = screen.getByTestId('portalOverlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the Escape key is pressed', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div>Content</div>
      </Portal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should trap focus inside the portal when Tab is pressed on the last element', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <input data-testid="first-input" placeholder="First" />
        <button data-testid="last-button">Submit</button>
      </Portal>
    );

    act(() => {
      vi.runAllTimers();
    });

    const closeButton = screen.getByRole('button', { name: /Close portal/i });
    const lastBarrier = document.body.querySelector(
      '.portal-loop-trigger'
    ) as HTMLButtonElement;
    expect(lastBarrier).not.toBeNull();

    fireEvent.focus(lastBarrier);

    expect(document.activeElement).toBe(closeButton);
  });
});

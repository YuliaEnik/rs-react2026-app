import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Portal } from './portal';

describe('Portal Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render nothing when isOpen is false', () => {
    render(
      <Portal isOpen={false} onClose={mockOnClose}>
        <div>Portal Content</div>
      </Portal>
    );

    expect(screen.queryByText('Portal Content')).toBeNull();
  });

  it('should render content inside document.body when isOpen is true', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div>Portal Content</div>
      </Portal>
    );

    const content = screen.getByText('Portal Content');
    expect(content).not.toBeNull();
  });

  it('should call onClose when clicking on the overlay backdrop', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div>Portal Content</div>
      </Portal>
    );

    const overlay = screen.getByTestId('portalOverlay');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the Escape key is pressed', () => {
    render(
      <Portal isOpen={true} onClose={mockOnClose}>
        <div>Portal Content</div>
      </Portal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

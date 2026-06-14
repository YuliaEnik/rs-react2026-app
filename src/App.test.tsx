import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';
import { useCountryStore } from './Store/useCountryStore';

vi.mock('./Store/useCountryStore', () => ({
  useCountryStore: vi.fn(),
}));

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    const mockStore = vi.mocked(useCountryStore);
    mockStore.mockImplementation((selector) =>
      selector({
        list: ['USA', 'Canada'],
        cards: [],
        addCard: vi.fn(),
      })
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render main navigation buttons and empty card list wrapper', () => {
    render(<App />);

    const hookButton = screen.getByRole('button', { name: /UseHookForm/i });
    const uncontrolledButton = screen.getByRole('button', {
      name: /UnControlledForm/i,
    });

    expect(hookButton).not.toBeNull();
    expect(uncontrolledButton).not.toBeNull();

    const cardListWrapper = screen.getByTestId('cardForm');
    expect(cardListWrapper).not.toBeNull();
  });

  it('should open Controlled Form Portal when UseHookForm button is clicked', async () => {
    render(<App />);
    expect(screen.queryByText(/FormUseHook/i)).toBeNull();

    const hookButton = screen.getByRole('button', { name: /UseHookForm/i });
    fireEvent.click(hookButton);

    await act(async () => {
      vi.runAllTimers();
    });
    const formHeading = screen.getByText(/FormUseHook/i);
    expect(formHeading).not.toBeNull();
  });

  it('should open Uncontrolled Form Portal when UnControlledForm button is clicked', async () => {
    render(<App />);

    expect(screen.queryByText(/Uncontrol Form/i)).toBeNull();

    const uncontrolledButton = screen.getByRole('button', {
      name: /UnControlledForm/i,
    });
    fireEvent.click(uncontrolledButton);

    await act(async () => {
      vi.runAllTimers();
    });

    const formHeading = screen.getByText(/Uncontrol Form/i);
    expect(formHeading).not.toBeNull();
  });
});

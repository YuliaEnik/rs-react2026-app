import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormUseHook } from '../formUseHook';

describe('FormUseHook Component', () => {
  it('should have submit button disabled by default due to live-validation', () => {
    render(<FormUseHook />);

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  it('should show error immediately when user types invalid data', async () => {
    render(<FormUseHook />);

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'alex' } });

    await waitFor(() => {
      const errorText = screen.getByText(/The first letter must be uppercase/i);
      expect(errorText).not.toBeNull();
    });

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});

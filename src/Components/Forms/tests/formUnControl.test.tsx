import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormUnControl } from '../formUnControl';

describe('FormUnControl Component', () => {
  it('should render all form labels and elements', () => {
    render(<FormUnControl />);

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const agreeCheckbox = screen.getByLabelText(/I agree/i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    }) as HTMLButtonElement;

    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();

    expect(agreeCheckbox.checked).toBe(false);
    expect(submitButton.disabled).toBe(false);
  });

  it('should show validation errors only after submitting the form', async () => {
    render(<FormUnControl />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });

    expect(
      screen.queryByText(/The first letter must be uppercase/i)
    ).toBeNull();

    fireEvent.click(submitButton);

    await waitFor(() => {
      const nameError = screen.getByText('The first letter must be uppercase');
      const ageError = screen.getByText('Age is required');
      const emailError = screen.getByText('Invalid email format');
      const countryError = screen.getByText('Enter country');
      const genderError = screen.getByText('Choose your gender');
      const agreeError = screen.getByText('You need to agree');

      const passwordError = screen.getByText('Password is required');
      const confirmPasswordError = screen.getByText(
        'Confirm password is required'
      );
      expect(nameError).not.toBeNull();
      expect(ageError).not.toBeNull();
      expect(emailError).not.toBeNull();
      expect(countryError).not.toBeNull();
      expect(genderError).not.toBeNull();
      expect(agreeError).not.toBeNull();
      expect(passwordError).not.toBeNull();
      expect(confirmPasswordError).not.toBeNull();
    });
  });
});

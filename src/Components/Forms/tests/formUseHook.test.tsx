import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FormUseHook } from '../formUseHook';
import { useCountryStore } from '../../../Store/useCountryStore';
import * as yup from 'yup';

vi.mock('../../../Store/useCountryStore', () => ({
  useCountryStore: vi.fn(),
}));

vi.mock('../../../helpers/converFile', () => ({
  convertFileToBase64: vi.fn(() =>
    Promise.resolve('data:image/png;base64,mocked_image')
  ),
}));

const mockValidSchema = yup.object({});
vi.spyOn(mockValidSchema, 'validate').mockImplementation(() =>
  Promise.resolve(true)
);

vi.mock('../../../helpers/schema', () => ({
  get schema() {
    return mockValidSchema;
  },
}));

describe('FormUseHook Component - Deep Coverage Tests', () => {
  const mockOnSuccess = vi.fn();
  const mockAddCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockStore = vi.mocked(useCountryStore);
    mockStore.mockImplementation((selector) =>
      selector({
        list: ['USA', 'Canada', 'Ukraine'],
        cards: [],
        addCard: mockAddCard,
      })
    );
  });

  it('should render form fields successfully', () => {
    render(<FormUseHook onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByLabelText('Name:') as HTMLInputElement;
    expect(nameInput).not.toBeNull();
  });

  it('should successfully submit form and invoke store callbacks', async () => {
    const { container } = render(<FormUseHook onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByLabelText('Name:') as HTMLInputElement;
    const ageInput = screen.getByLabelText('Age:') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email:') as HTMLInputElement;
    const countryInput = screen.getByLabelText('Country:') as HTMLInputElement;
    const maleRadio = screen.getByLabelText('Male') as HTMLInputElement;
    const fileInput = screen.getByLabelText('Choose file:') as HTMLInputElement;
    const agreeCheckbox = screen.getByLabelText('I agree:') as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      'Password:'
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      'Confirm password:'
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'Ivan' } });
      fireEvent.change(ageInput, { target: { value: '25' } });
      fireEvent.change(emailInput, { target: { value: 'ivan@example.com' } });
      fireEvent.change(countryInput, { target: { value: 'USA' } });

      fireEvent.click(maleRadio);
      fireEvent.click(agreeCheckbox);

      fireEvent.change(passwordInput, {
        target: { value: 'SafePassword123!' },
      });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'SafePassword123!' },
      });

      const mockFile = new File(['mock_blob'], 'test.png', {
        type: 'image/png',
      });
      fireEvent.change(fileInput, { target: { files: [mockFile] } });
    });

    const formElement = container.querySelector('form');
    expect(formElement).not.toBeNull();

    await act(async () => {
      fireEvent.submit(formElement!);
    });

    await waitFor(() => {
      expect(mockAddCard).toHaveBeenCalledTimes(1);
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});

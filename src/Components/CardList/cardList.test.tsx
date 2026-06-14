import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCountryStore } from '../../Store/useCountryStore';
import { CardList } from './cardList';

vi.mock('../../Store/useCountryStore', () => ({
  useCountryStore: vi.fn(),
}));

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render an empty wrapper when there are no cards', () => {
    const mockStore = vi.mocked(useCountryStore);

    mockStore.mockImplementation((selector) =>
      selector({
        list: [],
        cards: [],
        addCard: () => {},
      })
    );

    render(<CardList />);

    const wrapper = screen.getByTestId('cardForm');
    expect(wrapper).not.toBeNull();
    expect(wrapper.children.length).toBe(0);
  });

  it('should render profiles with correct data and apply last-card class only to the last item', () => {
    const mockCards = [
      {
        name: 'Alice',
        age: 20,
        email: 'alice@test.com',
        country: 'Canada',
        gender: 'female',
        file: 'data:image/png;base64,alice_photo',
        agree: true,
      },
      {
        name: 'Bob',
        age: 30,
        email: 'bob@test.com',
        country: 'USA',
        gender: 'male',
        file: 'data:image/png;base64,bob_photo',
        agree: true,
      },
    ];

    const mockStore = vi.mocked(useCountryStore);

    mockStore.mockImplementation((selector) =>
      selector({
        list: ['USA', 'Canada'],
        cards: mockCards,
        addCard: () => {},
      })
    );

    render(<CardList />);

    expect(screen.getByText('Alice')).not.toBeNull();
    expect(screen.getByText('Bob')).not.toBeNull();

    const wrapper = screen.getByTestId('cardForm');
    const cardElements = wrapper.querySelectorAll('.card');

    expect(cardElements.length).toBe(2);

    const firstCard = cardElements[0] as HTMLDivElement;
    const secondCard = cardElements[1] as HTMLDivElement;

    expect(firstCard.className.includes('last-card')).toBe(false);
    expect(secondCard.className.includes('last-card')).toBe(true);

    const firstImg = firstCard.querySelector('.img') as HTMLImageElement;
    expect(firstImg.src).toBe('data:image/png;base64,alice_photo');
  });
});

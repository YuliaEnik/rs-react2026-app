export interface IData {
  id: number;
  title: string;
  creators?: Array<{ description: string }>;
  creation_date?: string;
  images?: { web?: { url?: string } };
  description?: string;
  onClick?: (id: number) => void;
  isSelected?: boolean;
}
export interface CardState {
  imgError: boolean;
}

export type SearchProps = {
  onSearch: (value: string) => void;
};
export interface CardListProps {
  loading: boolean;
  repos: IData[] | null;
  error: string | null;
  searchQuery: string;
  currentPage?: number;
  onCardClick?: (id: number) => void;
}

export interface ICheckbox {
  id: number;
  checked?: boolean;
  onChange?: () => void;
}

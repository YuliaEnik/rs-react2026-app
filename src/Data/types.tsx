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

export interface IDataApi {
  repos: IData[] | null;
  isLoading: boolean;
  currentPage: number;
  hasMore: boolean;
  searchQuery: string;
  errorMessage: string | null;
}

export interface CardState {
  imgError: boolean;
}

export interface IHomeState {
  loading: boolean;
  repos: IData[] | null;
  error: string | null;
}

export interface IDetails {
  closeDetails: () => void;
  card: IData | null;
  isActive: boolean;
}

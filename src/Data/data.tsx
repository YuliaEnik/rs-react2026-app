export interface IData {
  id: number;
  title: string;
  creators?: Array<{ description: string }>;
  creation_date?: string;
  images?: { web?: { url?: string } };
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

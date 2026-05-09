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
}

export interface CardState {
  imgError: boolean;
}

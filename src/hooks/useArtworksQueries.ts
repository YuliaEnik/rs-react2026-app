import { useQuery } from "@tanstack/react-query";
import { PAGINATION } from "../constants/numbers";
import { ERROR_MESSAGES } from "../constants/text";
import type { IData } from "../types/types";

interface IFetchResponse {
  data: IData[];
  hasMore: boolean;
  total: number;
}

const fetchArtworksQueryFn = async (
  search: string,
  page: number,
): Promise<IFetchResponse> => {
  const query = search.trim();
  const limit = PAGINATION.CARDS_PER_PAGE;
  const skip = (page - 1) * limit;
  const fieldsParam = "id,title,creators,images,creation_date,description";

  const url = query
    ? `/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`
    : `/api/artworks?has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`;

  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) throw new Error(ERROR_MESSAGES.API_NOT_FOUND);
    if (res.status === 429) throw new Error(ERROR_MESSAGES.API_TOO_MANY);
    if (res.status >= 500) throw new Error(ERROR_MESSAGES.API_SERVER_ERROR);
    throw new Error(`${ERROR_MESSAGES.API_FAILED} ${res.status}`);
  }

  const data = await res.json();
  const results = data.data || [];

  return {
    data: results,
    hasMore: results.length === limit,
    total: data.info?.total || data.total || results.length,
  };
};

export const useGetArtworks = (search: string, page: number) => {
  return useQuery({
    queryKey: ["artworks", search, page],
    queryFn: () => fetchArtworksQueryFn(search, page),
  });
};

export const fetchArtworkByIdQueryFn = async (id: string): Promise<IData> => {
  const res = await fetch(`/api/artworks/${id}`);
  if (!res.ok) {
    throw new Error(ERROR_MESSAGES.API_NOT_FOUND);
  }
  const json: { data?: IData } & IData = await res.json();
  return json.data || json;
};

export const useGetArtworkById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["artwork", id],
    queryFn: () => fetchArtworkByIdQueryFn(id!),
    enabled: !!id,
  });
};

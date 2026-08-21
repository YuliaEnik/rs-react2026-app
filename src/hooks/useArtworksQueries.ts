import { PAGINATION } from "../constants/numbers";
import { ERROR_MESSAGES } from "../constants/text";
import type { IData } from "../types/types";

interface IFetchResponse {
  data: IData[];
  hasMore: boolean;
  total: number;
}

export const fetchArtworksQueryFn = async (
  search: string,
  page: number,
): Promise<IFetchResponse> => {
  const query = search.trim();
  const limit = PAGINATION.CARDS_PER_PAGE;
  const skip = (page - 1) * limit;
  const fieldsParam = "id,title,creators,images,creation_date,description";

  const baseUrl = "https://openaccess-api.clevelandart.org/api/artworks";

  const url = query
    ? `${baseUrl}?q=${encodeURIComponent(query)}&has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`
    : `${baseUrl}?has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Host: "openaccess-api.clevelandart.org",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok || !contentType || !contentType.includes("application/json")) {
    const textError = await res.text();

    console.error("--- CMA API ERROR DETECTED ---");
    console.error("Status:", res.status);
    console.error("Content-Type:", contentType);
    console.error("HTML Snippet:", textError.substring(0, 100));
    console.error("--------------------------------");

    throw new Error(`CMA API returned invalid content type: ${contentType}`);
  }

  const data = await res.json();
  const results = data.data || [];

  return {
    data: results,
    hasMore: results.length === limit,
    total: data.info?.total || data.total || results.length,
  };
};

export const fetchArtworkByIdQueryFn = async (id: string): Promise<IData> => {
  const res = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/${id}`,
  );
  if (!res.ok) {
    throw new Error(ERROR_MESSAGES.API_NOT_FOUND);
  }
  const json: { data?: IData } & IData = await res.json();
  return json.data || json;
};

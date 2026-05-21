import { PAGINATION } from "../constants/numbers";
import { ERROR_MESSAGES } from "../constants/text";
import type { IData } from "../types/types";

const getURL = async (
  search?: string,
  page: number = 1,
): Promise<{ data: IData[]; hasMore: boolean; total: number }> => {
  try {
    const query = search?.trim() || "";
    const limit = PAGINATION.LIMIT;
    const skip = (page - 1) * limit;
    const fieldsParam = "id,title,creators,images,creation_date,description";

    let url: string;
    if (query) {
      url = `/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=50&fields=${fieldsParam}`;
    } else {
      url = `/api/artworks?has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(ERROR_MESSAGES.API_NOT_FOUND);
      } else if (res.status === 429) {
        throw new Error(ERROR_MESSAGES.API_TOO_MANY);
      } else if (res.status >= 500) {
        throw new Error(ERROR_MESSAGES.API_SERVER_ERROR);
      } else {
        throw new Error(`${ERROR_MESSAGES.API_FAILED} ${res.status}`);
      }
    }

    const data = await res.json();

    let results = data.data || [];

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = data.data.filter((item: IData) => {
        const title = (item.title || "").toLowerCase();
        const author = (item.creators?.[0]?.description || "").toLowerCase();
        return title.includes(lowerQuery) || author.includes(lowerQuery);
      });

      const paginated = results.slice(skip, skip + limit);

      return {
        data: paginated as IData[],
        hasMore: paginated.length === limit,
        total: results.length,
      };
    }

    return {
      data: results as IData[],
      hasMore: results.length === limit,
      total: data.info?.total || 0,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default getURL;

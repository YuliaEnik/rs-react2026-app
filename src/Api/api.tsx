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
      url = `/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=${limit}&skip=${skip}&fields=${fieldsParam}`;
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

    const results = data.data || [];

    return {
      data: results as IData[],
      hasMore: results.length === limit,
      total: data.info?.total || data.total || results.length,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default getURL;

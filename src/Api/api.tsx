import type { IData } from "../Data/data";

const getURL = async (search?: string, page: number = 1): Promise<{ data: IData[]; hasMore: boolean; total: number }> => {
  try {
  const query = search?.trim()|| '';
  const limit = 12;
  const skip = (page - 1) * limit;

  const baseUrl = '/api/cleveland';

  let url: string;
  if (query) {
    url = `${baseUrl}/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=50`;
  } else {
    url = `${baseUrl}/api/artworks?has_image=1&limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);
  
  if (!res.ok) {
      if (res.status === 404) {
        throw new Error('API endpoint not found. Please try again later.');
      } else if (res.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else if (res.status >= 500) {
        throw new Error('Server error. Our team has been notified. Please try again later.');
      } else {
        throw new Error(`Request failed with status: ${res.status}`);
      }
    }

  const data = await res.json();

  let results = data.data || [];
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = data.data.filter((item: IData) => {
      const title = (item.title || '').toLowerCase();
      const author = (item.creators?.[0]?.description || '').toLowerCase();
      return title.includes(lowerQuery) || author.includes(lowerQuery);
    });
    
    const paginated = results.slice(skip, skip + limit);

    return {
      data: paginated as IData[],
      hasMore: paginated.length === limit,
      total: results.length
    };
  }

  return {
    data: results as IData[],
    hasMore: results.length === limit,
    total: data.info?.total || 0
  };
} catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export {getURL};

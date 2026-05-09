import type { IData } from "../Data/data";

const getURL = async (search?: string, page: number = 1) => {
  const query = search?.trim()|| '';
  const limit = 12;
  const skip = (page - 1) * limit;
  
  let url: string;
  if (query) {
    url = `/api/cleveland/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=50`;
  } else {
    url = `/api/cleveland/api/artworks?has_image=1&limit=${limit}&skip=${skip}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('error');
  const data = await res.json();

  let results = data.data;
  
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
};

export {getURL};

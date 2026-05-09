import type { IData } from "../Data/data";

const getURL = async (search?: string, page: number = 1) => {
  const query = search && search.trim() !== '' ? search : 'painting';
  const limit = 12;
  const skip = (page - 1) * limit;
  
  const url = `/api/cleveland/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  const data = await res.json();

  const validData = data.data.filter((item: IData) => item.images?.web?.url);

  return { 
    data: validData as IData[],
    hasMore: validData.length === limit
  };
};

export { getURL };

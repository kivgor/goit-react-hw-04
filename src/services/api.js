import axios from 'axios';

export const fetchImagesByQuery = async (query, page) => {
  const { data } = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      client_id: 'fAybjthjUpXgAiQRgc05ZoRjv6Q4t5ldGkTZ1S9E_oo',
      query,
      page,
      per_page: 12,
      orientation: 'landscape',
    },
  });

  return data;
};

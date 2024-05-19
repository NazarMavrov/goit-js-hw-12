import axios from 'axios';

export async function searchImages(searchTerm, page = 1) {
  const apiKey = '43845799-470caa65ff354fc4cfb98d159';
  const params = {
    key: apiKey,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15
  };

  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data: ' + error.message);
  }
}

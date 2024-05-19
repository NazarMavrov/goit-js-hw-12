export function searchImages(searchTerm) {
  const apiKey = '43845799-470caa65ff354fc4cfb98d159';
  const params = new URLSearchParams({
    key: apiKey,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true'
  });

  const url = `https://pixabay.com/api/?${params.toString()}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw new Error('Error fetching data: ' + error.message);
    });
}
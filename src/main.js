import { searchImages } from './js/pixabay-api.js';
import { updateGallery } from './js/render-functions.js';

let currentPage = 1;
let currentSearchTerm = '';

document.querySelector('.search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  currentSearchTerm = document.querySelector('.search-input').value.trim();
  if (currentSearchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  currentPage = 1;
  document.querySelector('.gallery').innerHTML = '';
  document.querySelector('.load-more').style.display = 'none';
  searchAndDisplayImages();
});

document.querySelector('.load-more').addEventListener('click', function() {
  currentPage++;
  searchAndDisplayImages();
});

async function searchAndDisplayImages() {
  try {
    document.querySelector('.loader').style.display = 'block';
    const data = await searchImages(currentSearchTerm, currentPage);
    document.querySelector('.loader').style.display = 'none';

    if (data.hits.length === 0 && currentPage === 1) {
      updateGallery([]);
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    updateGallery(data.hits);

    if (data.hits.length > 0) {
      document.querySelector('.load-more').style.display = 'block';
    } else {
      document.querySelector('.load-more').style.display = 'none';
    }
  } catch (error) {
    document.querySelector('.loader').style.display = 'none';
    console.error('Error fetching data:', error);
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again later.',
    });
  }
}

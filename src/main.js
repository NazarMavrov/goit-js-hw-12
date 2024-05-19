import { searchImages } from './js/pixabay-api.js';
import { updateGallery } from './js/render-functions.js';

let currentPage = 1;
let currentSearchTerm = '';
let totalHits = 0;
let loadedHits = 0;

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
  loadedHits = 0;
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
    loadedHits += data.hits.length;
    totalHits = data.totalHits;

    const galleryElement = document.querySelector('.gallery');
    const { height: cardHeight } = galleryElement.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

      if (loadedHits >= totalHits) {
      document.querySelector('.load-more').style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      document.querySelector('.load-more').style.display = 'block';
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
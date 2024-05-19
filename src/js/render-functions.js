export function updateGallery(images) {
  const galleryElement = document.querySelector('.gallery');

  images.forEach(image => {
    const imageHTML = `
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
    `;
    galleryElement.insertAdjacentHTML('beforeend', imageHTML);
  });

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

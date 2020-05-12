import galleryItems from './gallery-items.js';
('use strict');

const myGallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
let currentItem = null;

function createGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
    </a>
  </li>`;
    })
    .join('');
}
myGallery.insertAdjacentHTML('beforeend', createGallery(galleryItems));

myGallery.addEventListener('click', showModal);

function showModal(e) {
  if (e.target.nodeName !== 'IMG') return;
  currentItem = e.target.closest('li');
  e.preventDefault();
  modal.classList.add('is-open');
  modalImg.setAttribute('src', e.target.dataset.source);
  modalImg.setAttribute('alt', e.target.alt);
  modal.addEventListener('click', handlerLightboxClick);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', keyPressClose);
}

function handlerLightboxClick(evn) {
  if (evn.target.nodeName === 'IMG') return;
  closeModal();
}

function closeModal() {
  modal.classList.remove('is-open');
  modalImg.setAttribute('src', '');
  modalImg.setAttribute('alt', '');
  modal.removeEventListener('click', handlerLightboxClick);
  closeBtn.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', keyPressClose);
}

function keyPressClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  } else if (event.code === 'ArrowRight') {
    aRight();
  } else if (event.code === 'ArrowLeft') {
    aLeft();
  }
  return;
}

function aRight() {
  if (currentItem.nextElementSibling === null) {
    currentItem = currentItem.closest('ul').firstElementChild;
  } else {
    currentItem = currentItem.nextElementSibling;
  }

  let aRightImage = currentItem.querySelector('.gallery__image');
  modalImg.setAttribute('src', aRightImage.dataset.source);
  modalImg.setAttribute('alt', aRightImage.alt);
}

function aLeft() {
  if (currentItem.previousElementSibling === null) {
    currentItem = currentItem.closest('ul').lastElementChild;
  } else {
    currentItem = currentItem.previousElementSibling;
  }

  let aLeftImage = currentItem.querySelector('.gallery__image');
  modalImg.setAttribute('src', aLeftImage.dataset.source);
  modalImg.setAttribute('alt', aLeftImage.alt);
}

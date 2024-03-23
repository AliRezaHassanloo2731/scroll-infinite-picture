'use strict';
const imageContainer = document.getElementById('image-container');
const loder = document.getElementById('loder');

let photos = [];
let ready = false;
let imagesLoded = 0;
let totalImagesLoded = 0;

let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=fe8F8lfqegj8XFi6li5CMWC5uHs2CX6ricYtPhN15lI&count=${count}`;

function displayImageLoaded() {
  imagesLoded++;
  if (imagesLoded === totalImagesLoded) {
    ready = true;
    loder.hidden = true;
    count = 30;
  }
}
const setAttributes = function (el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
};

function markupGenerator() {
  imagesLoded = 0;
  totalImagesLoded = photos.length;
  photos.forEach(photo => {
    // const markup = `
    // <a href="${photo.links.html}" target="_blank">
    // <img
    //   src="${photo.urls.regular}"
    //   alt="${photo.alt_description}"
    //   title="${photo.alt_description}"
    // />`;

    // imageContainer.insertAdjacentHTML('afterbegin', markup);

    //2.
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load', displayImageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photos = await res.json();

    markupGenerator();
  } catch (error) {
    console.log('sth went wrong', error);
  }
}

window.addEventListener('scroll', function () {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();

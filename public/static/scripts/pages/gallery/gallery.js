import { tabs } from '../../components/tabs'
import { buildGallery } from './images'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/windows.json'


export function gallery() {
	var imageContainer1 = document.querySelector('.gallery');
	var loadMoreButton = document.getElementById('load-more');
	var galleryLinks = document.querySelectorAll('.tab-link');
	var windowPage = 0;
	var galleryLoaded = false;
	var images = [];
	var hiddenImages = [];
	var displayedImages = [];
	var windowGallery = buildGallery(windows);


	insertImages(windowGallery.slice(0, 10));


	Array.prototype.forEach.call(galleryLinks, (link) => {
		if (!link.classList.contains('gallery-loaded')) {

			let clickHandler = () => {
				setupGallery(link);

				setTimeout(() => {
					link.removeEventListener('click', clickHandler, false);
				}, 1000);
			};

			link.addEventListener('click', clickHandler, false);
		}
	});

	function setupGallery(item) {
		var galleryName = '';

		if (!item.classList.contains('gallery-loaded')) {
			if (item.classList.contains('window-link')) {
				galleryName = 'windows';
				loadGallery(item, galleryName);
			} else if (item.classList.contains('canvas-link')) {
				galleryName = 'canvas';
				loadGallery(item, galleryName)
			}
		}
	}

	function loadGallery(item, gallery) {
		buildImages(gallery);
		item.classList.add('gallery-loaded');
	}



	tabs();

	var lazyLoader = new lazy();

	baguetteBox.run('.gallery-2', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-3', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-4', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-5', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});



	function insertImages(newImages) {
		return new Promise((resolve) => {
			let i;
			for (i = 0; i < newImages.length; i++) {
				let lightboxSrc = document.createElement('a');
				let image = document.createElement('img');
				lightboxSrc.setAttribute("href", newImages[i].src);
				image.setAttribute('alt', newImages[i].caption);

				lightboxSrc.appendChild(image);
				imageContainer1.appendChild(lightboxSrc);

				if (lightboxSrc.getBoundingClientRect().top <= window.innerHeight + 100 && lightboxSrc.getBoundingClientRect().top > 0) {
					image.src = newImages[i].src;
					displayedImages.push(newImages[i]);
				} else {
					hiddenImages.push({image: newImages[i], container: lightboxSrc});
				}

			}

			resolve();
		})
		.then(() => {
			baguetteBox.run('.gallery', {
				captions: (element) => {
					return element.getElementsByTagName('img')[0].alt;
				},
				animation: 'fadeIn'
			});

			window.addEventListener('scroll', checkViewport, false);
		});
	}

	function checkViewport() {
		hiddenImages.forEach((item) => {
			let rect = item.container.getBoundingClientRect();
			if (rect.top <= window.innerHeight + 100 && rect.top > 0) {
				item.container.firstChild.src = item.image.src;
			} else {
				return;
			}
		});
	}


	function loadMoreImages() {
		var page1 =	images.slice(10, 20);
		var page2 = images.slice(20, 30);
		var page3 = images.slice(30, 40);
		var page4 = images.slice(40, 50);
		var page5 = images.slice(50, 60);

		
		if (windowPage === 0) {
			insertImages(page1);
		}

		if (windowPage === 1) {
			insertImages(page2);
		}

		if (windowPage === 2) {
			insertImages(page3);
		}

		if (windowPage === 3) {
			insertImages(page4);
		}

		if (windowPage === 4) {
			insertImages(page5);
		}

		if (displayedImages.length !== images.length) {
			windowPage++;
		} else {
			loadMoreButton.removeEventListener('click', loadMoreImages, false);
			loadMoreButton.classList.add('no-more-images');
		}

	}


	loadMoreButton.addEventListener('click', loadMoreImages, false);
	window.addEventListener('DOMContentLoaded', lazyLoader.init, false);
	window.addEventListener('scroll', lazyLoader.viewPortChange, false);
}
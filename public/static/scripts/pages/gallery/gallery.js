import { tabs } from '../../components/tabs'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/windows.json'


export function gallery() {
	var imageContainer1 = document.querySelector('.gallery');
	var loadMoreButton = document.getElementById('load-more');
	var galleryLinks = document.querySelectorAll('.tab-link');
	var windowPage = 0;
	var images = [];
	var hiddenImages = [];
	var displayedImages = [];


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


	function buildImages(gallery) {
		let i;
		let item;

		gallery = gallery || {}

		if (typeof gallery !== 'object' && gallery == 'windows' || typeof gallery === 'object') {

			for (i = 0; i < windows.length; i++) {
				item = windows[i];
				images.push({
					src: item.src,
					caption: item.caption
				});
			}

			insertImages(images.slice(0, 10));
		} else {
			console.log('no images yet');
		}
	}


	function insertImages(newImages) {
		return new Promise((resolve) => {
			let i;
			for (i = 0; i < newImages.length; i++) {
				let lightboxSrc = document.createElement('a');
				let image = document.createElement('img');
				image.setAttribute('alt', newImages[i].caption);

				lightboxSrc.appendChild(image);
				imageContainer1.appendChild(lightboxSrc);

				if (lightboxSrc.getBoundingClientRect().top <= window.innerHeight + 100 && lightboxSrc.getBoundingClientRect().top > 0) {
					image.src = newImages[i].src;
					lightboxSrc.setAttribute("href", newImages[i].src);
					displayedImages.push(newImages[i]);
				} else {
					hiddenImages.push(newImages[i]);
					console.log(hiddenImages);
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

	buildImages();



	loadMoreButton.addEventListener('click', loadMoreImages, false);
	window.addEventListener('DOMContentLoaded', lazyLoader.init, false);
	window.addEventListener('scroll', lazyLoader.viewPortChange, false);
}
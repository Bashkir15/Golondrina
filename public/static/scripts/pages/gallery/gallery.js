import { tabs } from '../../components/tabs'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/windows.json'


export function gallery() {
	var imageContainer1 = document.querySelector('.gallery');
	var loadMoreButton = document.getElementById('load-more');
	var windowPage = 0;
	var images = [];
	var displayedImages = [];

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


	function buildImages() {
		let i;
		let item;

		for (i = 0; i < windows.length; i++) {
			item = windows[i];
			images.push({
				src: item.src,
				caption: item.caption
			});
		}

		insertImages(images.slice(0, 10));
	}


	function insertImages(newImages) {
		return new Promise((resolve) => {
			let i;
			for (i = 0; i < newImages.length; i++) {
				let lightboxSrc = document.createElement('a');
				let image = document.createElement('img');
				lightboxSrc.setAttribute('href', newImages[i].src);
				//image.setAttribute('data-src', startingImages[i].src);
				image.setAttribute('alt', newImages[i].caption);
				image.src = newImages[i].src;

				lightboxSrc.appendChild(image);
				imageContainer1.appendChild(lightboxSrc);
				displayedImages.push(newImages[i]);
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
		var page1 = images.slice(10, 20);
		var page2 = images.slice(20, 30);
		var page3 = images.slice(30, 40);

		
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

		windowPage++;

	}

	buildImages();



	loadMoreButton.addEventListener('click', loadMoreImages, false);
	window.addEventListener('DOMContentLoaded', lazyLoader.init, false);
	window.addEventListener('scroll', lazyLoader.viewPortChange, false);
}
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

		loadImages(0, 10);
	}

	function loadImages(sliceStart, sliceEnd) {
		var previousSliceCount;
		var page1 = [];
		var page2 = [];
		if (windowPage === 0) {
			page1 = images.slice(sliceStart, sliceEnd);
			insertImages(page1);
		} else if (windowPage === 1) {
			page2 = images.slice(sliceStart, sliceEnd);
			insertImages(page2);
		}
	}

	function insertImages(images) {
		return new Promise((resolve, reject) => {
			let i;
			for (i = 0; i < images.length; i++) {
				let lightboxSrc = document.createElement('a');
				let image = document.createElement('img');
				lightboxSrc.setAttribute('href', images[i].src);
				image.setAttribute('data-src', images[i].src);
				image.setAttribute('alt', images[i].caption);
				image.src = images[i].src;

				lightboxSrc.appendChild(image);
				imageContainer1.appendChild(lightboxSrc);
				displayedImages.push(images[i]);
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
		var newSliceStart = displayedImages.length;
		var newSliceEnd;
		windowPage++;

		if (windowPage === 1) {
			newSliceEnd = 4;
		}

		loadImages(newSliceStart, newSliceEnd);

	}

	buildImages();


	/* function handleImages() {
		let query = document.querySelectorAll('.lazy');

		Array.prototype.map.call(query, (item) => {
			if (isInView)
		})
	}



	function loadImage(element, fn) {
		var img = new Image();
		var src = element.getAttribute('data-src');

		img.onload = () => {
			if (!!element.parent) {
				element.parent.replaceChild(img, element);
			} else {
				element.src = src;
			}

			fn ? fn() : null;
		}

		img.src = src;
	}

	function isInViewport(element) {
		var rect = element.getBoundingClientRect();

		return (
			rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
		);
	}

	var images = new Array();
	var query = document.querySelectorAll('.lazy');
	var progressScroll = function() {
		for (var i = 0; i < images.length; i++) {
			if (isInViewport(images[i])) {
				loadImage(images[i], () => {
					images.splice(i,i);
				})
			}
		}
	};

	for (var i = 0; i < query.length; i++) {
		images.push(query[i]);
	}

	progressScroll();
	window.addEventListener('scroll', progressScroll); */

	loadMoreButton.addEventListener('click', loadMoreImages, false);
	window.addEventListener('DOMContentLoaded', lazyLoader.init, false);
	window.addEventListener('scroll', lazyLoader.viewPortChange, false);
}
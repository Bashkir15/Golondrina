import { tabs } from '../../components/tabs'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/Gallery/windows.json'


export function gallery() {
	var imageContainer1 = document.querySelector('.gallery');
	var loadMoreButton = document.getElementById('load-more');
	var windowPage = 0;
	var images = [];
	var displayedImages = [];

	tabs();

	var lazyLoader = new lazy();

/*	baguetteBox.run('.gallery', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		},
		animation: 'fadeIn'
	}); */

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

		for (var i in windows) {
			if (windows.hasOwnProperty(i)) {
				var item = windows[i];
				images.push({
					src: item.src,
					caption: item.caption
				});
			}
		}

		loadImages(0, 2);
	}

	function loadImages(sliceStart, sliceEnd) {
		var previousSliceCount;
		var page1 = [];
		var page2 = [];
		if (windowPage === 0) {
			page1 = images.slice(sliceStart, sliceEnd);
			insertImages(page1);
			//previousSliceCount = sliceCount;
			//console.log(previousSliceCount);
		} else if (windowPage === 1) {
			page2 = images.slice(sliceStart, sliceEnd);
			insertImages(page2);
			//previousSliceCount = sliceCount;
		}
	}

	function insertImages(images) {
		//let currentPage = windowPage;
		return new Promise((resolve, reject) => {
			for (let i = 0; i < images.length; i++) {
				var lightboxSrc = document.createElement('a');
				var image = document.createElement('img');
				console.log(images[i]);

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
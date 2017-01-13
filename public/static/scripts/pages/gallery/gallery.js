import { tabs } from '../../components/tabs'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/Gallery/windows.json'


export function gallery() {
	tabs();

	var lazyLoader = new lazy();

	baguetteBox.run('.gallery', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		},
		animation: 'fadeIn'
	});

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
		var images = [];

		for (var i in windows) {
			if (windows.hasOwnProperty(i)) {
				var item = windows[i];
				images.push({
					src: item.src,
					caption: item.caption
				});
			}
		}

		console.log(images);
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

	window.addEventListener('DOMContentLoaded', lazyLoader.init, false);
	window.addEventListener('scroll', lazyLoader.viewPortChange, false);
}
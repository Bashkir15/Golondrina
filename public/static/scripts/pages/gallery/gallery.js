import { tabs } from '../../components/tabs'

export function gallery() {
	tabs();

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
	window.addEventListener('scroll', progressScroll);
}
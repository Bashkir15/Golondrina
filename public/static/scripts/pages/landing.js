import { contact } from '../utils/contact'

export function landing() {
	const carouselElement = document.querySelector('.landing-carousel');

	const flick = new Flickity(carouselElement, {
		autoPlay: 3500,
		pauseAutoPlayOnHover: false,
		draggable: false,
		wrapAround: true,
		cellSelector: '.landing-cell'
	});

	contact();

}
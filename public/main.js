import mobileMenu from './static/scripts/components/mobile-menu'
import scrollIn from './static/scripts/utils/scroll.in'
import { landing } from './static/scripts/pages/landing'
import { gallery } from './static/scripts/pages/gallery/gallery'
import { contact } from './static/scripts/pages/contact/contact'

const navTrigger = document.getElementById('nav-trigger');
const navLinks = document.querySelectorAll('.nav-link');
const nav = document.getElementById('nav');
const preloader = document.querySelector('.preloader-container');

const menu = new mobileMenu();

activeUrl();


if (navTrigger != 'undefined') {
	navTrigger.addEventListener('click', menu.toggle, false);
}

function activeUrl() {
	let i;
	let len = navLinks.length;

	for (i = 0; i < len; i++) {
		let link = navLinks[i];

		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	}

	
}


HTMLDocument.prototype.ready = () => {
	return new Promise((resolve, reject) => {
		if (document.readyState === 'complete') {
			resolve(document);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				resolve(document);
			})
		}
	})
}

document.ready().then(() => {
	setTimeout(() => {
		preloader.classList.add('loaded');

		setTimeout(() => {
			document.body.classList.add('loaded');
		}, 500)
	}, 1000);
});


if (window.location.href.indexOf('portfolio') != -1) {
//	portfolio();
} else if (window.location.href.indexOf('contact') != -1) {
	contact();
} else if (window.location.href.indexOf('gallery') != -1) {
	gallery();
} else {
	landing();
}


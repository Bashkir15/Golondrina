import mobileMenu from './static/scripts/components/mobile-menu'
import scrollIn from './static/scripts/utils/scroll.in'
import { landing } from './static/scripts/pages/landing'
import { gallery } from './static/scripts/pages/gallery/gallery'
import { contact } from './static/scripts/pages/contact/contact'

const navTrigger = document.getElementById('nav-trigger');
const navLinks = document.querySelectorAll('.nav-link');
const nav = document.getElementById('nav');

const menu = new mobileMenu();
const scroller = new scrollIn();

let scrollTimeout;
let resizeTimeout;

if (navTrigger != 'undefined') {
	navTrigger.addEventListener('click', menu.toggle, false);
}

function activeUrl() {
	var pathNames = ['/contact', '/gallery'];



	Array.prototype.forEach.call(navLinks, (link) => {
		if (pathNames.indexOf(link.getAttribute("href")) != -1 && link.getAttribute("href") == window.location.pathname) {
			link.classList.add('active');
			nav.classList.add('normal-nav');
		} else  if (link.getAttribute("href") == window.location.pathname) {
			link.classList.add('active');
		}
	});

	
}

function scrollThrottle() {
	if (!scrollTimeout) {
		scrollTimeout = setTimeout(() => {
			scrollTimeout = null;
			scroller.viewPortChange();
		}, )
	}
}

function resizeThrottle() {
	if (!resizeTimeout) {
		resizeTimeout = setTimeout(() => {
			resizeTimeout = null;
			scroller.viewPortChange();
		}, 250);
	}
}


if (window.location.href.indexOf('portfolio') != -1) {
//	portfolio();
} else if (window.location.href.indexOf('contact') != -1) {
	contact();
} else if (window.location.href.indexOf('gallery') != -1) {
	gallery();
} else {
	landing();
}

activeUrl();

window.addEventListener('DOMContentLoaded', scroller.init, false);
window.addEventListener('scroll', scrollThrottle, false);
window.addEventListener('resize', resizeThrottle, false);

window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
import mobileMenu from './static/scripts/components/mobile-menu'
import { landing } from './static/scripts/pages/landing'
import { signup } from './static/scripts/pages/auth/signup'
import { login } from './static/scripts/pages/auth/login'
import { admin } from './static/scripts/pages/admin/admin'
import { gallery } from './static/scripts/pages/gallery/gallery'
import { contact } from './static/scripts/pages/contact/contact'
//import about from './scripts/pages/about'
//import portfolio from './scripts/pages/portfolio'
//import recent from './scripts/pages/recent'

var navTrigger = document.getElementById('nav-trigger');
var footer = document.getElementById('footer');
var navLinks = document.querySelectorAll('.nav-link');

var menu = new mobileMenu();

if (navTrigger != 'undefined') {
	navTrigger.addEventListener('click', menu.toggle, false);
}

function activeUrl() {
	var pathNames = ['/contact', '/gallery'];



	Array.prototype.forEach.call(navLinks, (link) => {
		if (pathNames.indexOf(link.getAttribute("href")) != -1 && link.getAttribute("href") == window.location.pathname) {
			link.classList.add('active')
		} else  if (link.getAttribute("href") == window.location.pathname) {
			link.classList.add('landing-active');
		}
	});
}

function fixElements() {
	if (footer.classList.contains('landing-footer')) {
		footer.classList.remove('landing-footer');
	}
	
	footer.classList.add('normal-footer');
}

function landingElements() {
	if (footer.classList.contains('normal-footer')) {
		footer.classList.remove('normal-footer');
	}

	footer.classList.add('landing-footer');
}


if (window.location.href.indexOf('portfolio') != -1) {
//	portfolio();
} else if (window.location.href.indexOf('contact') != -1) {
	contact();
	fixElements();
} else if (window.location.href.indexOf('about') != -1) {
//	about();
} else if (window.location.href.indexOf('recent') != -1) {
//	recent();
} else if (window.location.href.indexOf('signup') != -1) {
	signup();
	fixElements();
} else if (window.location.href.indexOf('admin') != -1) {
	admin();
	fixElements();
} else if (window.location.href.indexOf('gallery') != -1) {
	gallery();
	fixElements();
} else if (window.location.href.indexOf('login') != -1) {
	login();
} else {
	landing();
	landingElements();
}

activeUrl();

window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
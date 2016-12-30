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

var menu = new mobileMenu();

if (navTrigger != 'undefined') {
	navTrigger.addEventListener('click', menu.toggle, false);
}


if (window.location.href.indexOf('portfolio') != -1) {
//	portfolio();
} else if (window.location.href.indexOf('contact') != -1) {
	contact();
} else if (window.location.href.indexOf('about') != -1) {
//	about();
} else if (window.location.href.indexOf('recent') != -1) {
//	recent();
} else if (window.location.href.indexOf('signup') != -1) {
	signup();
} else if (window.location.href.indexOf('admin') != -1) {
	admin();
} else if (window.location.href.indexOf('gallery') != -1) {
	gallery();
} else if (window.location.href.indexOf('login') != -1) {
	login();
} else {
	landing();
}


window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
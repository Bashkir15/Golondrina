import mobileMenu from './scripts/components/mobile.menu'
import home from './scripts/pages/landing'
import contact from './scripts/pages/contact'
import about from './scripts/pages/about'
import portfolio from './scripts/pages/portfolio'

var navTrigger = document.getElementById('nav-trigger');

function openMobileMenu() {
	var menu = new mobileMenu();

	if (!navTrigger.classList.contains('open')) {
		navTrigger.classList.add('open');
		menu.toggle();
	} else {
		navTrigger.classList.remove('open');
		menu.toggle();
	}
}

if (navTrigger != 'undefined') {
	navTrigger.addEventListener('click', openMobileMenu, false);
}


if (window.location.href.indexOf('portfolio') != -1) {
	portfolio();
} else if (window.location.href.indexOf('contact') != -1) {
	contact();
} else if (window.location.href.indexOf('about') != -1) {
	about();
} else {
	home();
}

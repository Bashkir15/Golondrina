import mobileMenu from './scripts/components/mobile.menu'
import scrollNav from './scripts/utils/scroll.nav'
import home from './scripts/pages/landing'

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

scrollNav();

home();
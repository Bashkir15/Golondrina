import mobileMenu from './scripts/components/mobile.menu'

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

navTrigger.addEventListener('click', openMobileMenu, false);
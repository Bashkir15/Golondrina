var navTrigger = document.getElementById('nav-trigger');

function openMobileMenu() {
	if (!navTrigger.classList.contains('open')) {
		navTrigger.classList.add('open');
	} else {
		navTrigger.classList.remove('open');
	}
}

navTrigger.addEventListener('click', openMobileMenu, false);
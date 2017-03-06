import mobileMenu from '../components/mobile-menu'

export function navActions() {
	const navTrigger = document.getElementById('nav-trigger');
	const navLinks = document.querySelectorAll('.nav-link');
	const nav = document.getElementById('nav');
	const shrinkOn = 300;
	
	let scrolling;

	const menu = new mobileMenu();
	activeUrl();


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

	function scrollThrottle() {
		if (!scrolling) {
			window.requestAnimationFrame(() => {
				checkScroll();
				scrolling = true;
			});
		}

		scrolling = false;
	}

	function checkScroll() {
		let distanceY = getScrollY();

		if (distanceY > shrinkOn) {
			nav.classList.add('nav-small');
		} else {
			if (nav.classList.contains('nav-small')) {
				nav.classList.remove('nav-small');
			}
		}
	}

	function getScrollY() {
		return window.pageYOffset || window.scrollTop;
	}
	if (navTrigger) {
		navTrigger.addEventListener('click', menu.toggle, false);
	}
	
	window.addEventListener('scroll', scrollThrottle, false);
}
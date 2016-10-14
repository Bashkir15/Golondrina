function init() {
	window.addEventListener('scroll', () => {
		var distanceY = window.pageYOffset || document.documentElement.scrollTop;
		var nav = document.querySelector('nav');

		if (distanceY > 200) {
			nav.classList.add('nav--scrolled');
		} else {
			if (nav.classList.contains('nav--scrolled')) {
				nav.classList.remove('nav--scrolled');
			}
		}
	});
}

export default init
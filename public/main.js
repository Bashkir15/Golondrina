import { navActions } from './static/scripts/utils/nav'
import { preloader } from './static/scripts/utils/preloader'

import { landing } from './static/scripts/pages/landing'
import { gallery } from './static/scripts/pages/gallery/gallery'
import { contact } from './static/scripts/pages/contact/contact'

init();

function init() {
	preloader();
	activateScripts();
	navActions();
}

function activateScripts() {
	if (window.location.href.indexOf('contact') != -1) {
		contact();
	} else if (window.location.href.indexOf('gallery') != -1) {
		gallery();
	} else {
		landing();
	}
}





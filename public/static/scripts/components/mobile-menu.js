class mobileMenu {
	constructor(options) {
		this.container = document.getElementById('mobile-menu-container');
		this.menu = document.getElementById('mobile-menu');

		this.defaults = {
			closeKeys: [27],
			animatedClass: 'mobile-menu-container--animatable',
			openClass: 'mobile-menu-container--open'
		};

		this.toggle = this._toggle.bind(this);
		this._applySettings(options);
	}

	_applySettings(options) {
		if (typeof options === 'object') {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					this.defaults[i] = options[i];
				}
			}
		}
	}

	_toggle() {
		this.menu.style.willChange = 'opacity';
		this.container.classList.add(this.defaults.animatedClass);

		if (this.container.classList.contains(this.defaults.animatedClass) && !this.container.classList.contains(this.defaults.openClass)) {
			document.body.style.overflowY = 'hidden';
			document.body.style.position = 'fixed';

			this.container.classList.add(this.defaults.openClass);

			this._updateNav();
			this._addEvents();
		} else {
			document.body.style.overflowY = 'auto';
			document.body.style.position = 'relative';

			this.container.classList.remove(this.defaults.openClass);

			this._updateNav();
			this._removeEvents();
		}

		this.menu.style.willChange = 'auto';
	}

	_updateNav() {
		var nav = document.getElementById('nav');
		var navTrigger = document.getElementById('nav-trigger');

		if (this.container.classList.contains(this.defaults.openClass)) {
			nav.classList.add('nav-mobile--open');
			navTrigger.classList.add('open');
		} else {
			nav.classList.remove('nav-mobile--open');
			navTrigger.classList.remove('open');
		}
	}

	_closeKeyHandler(e) {
		if (this.container.classList.contains(this.defaults.openClass)) {
			if (this.defaults.closeKeys.indexOf(e.which) > -1) {
				e.preventDefault();
				this.toggle();
			}
		}
	}

	_onTransitionEnd() {
		this.container.classList.remove(this.defaults.animatedClass);
	}

	_addEvents() {
		let onTransitionEnd = this._onTransitionEnd.bind(this);
		let closeKeyHandler = this._closeKeyHandler.bind(this);

		this.container.addEventListener('transitionend', onTransitionEnd);
		document.body.addEventListener('keydown', closeKeyHandler);
	}

	_removeEvents() {
		let onTransitionEnd = this._onTransitionEnd.bind(this);
		let closeKeyHandler = this._closeKeyHandler.bind(this);

		this.container.removeEventListener('transitionend', onTransitionEnd);
		document.body.removeEventListener('keydown', closeKeyHandler);
	}
}

export default mobileMenu


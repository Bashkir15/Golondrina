import mod from '../utils/dom';

class MobileMenu {
	constructor() {
		this.container = document.getElementById('mobile-menu-container');
		this.menu = document.getElementById('mobile-menu');
		this.toggle = this._toggle.bind(this);
		this.animatedClass = 'mobile-menu-container--animatable';
		this.openClass = 'mobile-menu-container--open';
	}

	_toggle() {
		this.menu.style.willChange = 'opacity';
		mod.addClass(this.container, this.animatedClass);

		if (mod.hasClass(this.container, this.animatedClass) && !mod.hasClass(this.container, this.openClass)) {
			mod.addClass(this.container, this.openClass);
			this._updateNav();
			this._addEvents();
		} else {
			mod.removeClass(this.container, this.openClass);
			this._updateNav();
			this._addEvents();
		}

		this.menu.style.willChange = 'auto';
	}

	_updateNav() {
		var nav = document.getElementById('nav');

		if (mod.hasClass(this.container, this.openClass)) {
			nav.classList.add('nav-mobile--open');
		} else {
			nav.classList.remove('nav-mobile--open');
		}
	}

	_whichTransitionEvent() {
		var t;
		var el = document.createElement('div');
		var transitions = {
			'transition': 'transitionend',
			'0Transition': 'onTransitionEnd',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		};

		for (t in transitions) {
			if (el.style[t] !== undefined) {
				return transitions[t];
			}
		}
	}

	_onTransitionEnd() {
		this.container.classList.remove('mobile-menu-container--animatable');
	}

	_addEvents() {
		let onTransitionEnd = this._onTransitionEnd.bind(this);
		var transitionEvent = this._whichTransitionEvent();


		this.container.addEventListener('transitionend', onTransitionEnd);
	}
}

export default MobileMenu
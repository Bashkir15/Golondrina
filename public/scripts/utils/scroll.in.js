class ScrollIn {
	constructor() {
		this.elements = null;

		this.defaults = {
			duration: '1000',
			distance: '200',
			heightOffset: 200
		};

		this.enter = this._enter.bind(this);
		this.init = this._init.bind(this);
		this.viewPortChange = this._viewPortChange.bind(this);
	}

	_isInView(elem) {
		var rect = elem.getBoundingClientRect();

		return(
			((rect.top + this.defaults.heightOffset) >= 0 && (rect.top + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.bottom + this.defaults.heightOffset) >= 0 && (rect.bottom + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.top + this.defaults.heightOffset) < 0 && (rect.bottom + this.defaults.heightOffset) > window.innerHeight)
		);
	}

	_setInitialStyles(elem) {
		var anim = elem.getAttribute('data-entrance');
		var delay = elem.getAttribute('data-entrance-delay');

		elem.style.transition = "all " + (this.defaults.duration / 1000) + "s ease-out";

		if (delay) {
			elem.style.transitionDelay = (delay / 1000) + 's';
		}

		if (anim == 'fade') {
			elem.style.opacity = '0';
		}
	}

	_enter(elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.classList.add('has-entered');
	}

	_viewPortChange() {
		Array.prototype.map.call(this.elements, (item) => {
			var isInView = this._isInView(item);

			if (isInView) {
				var hasEntered = item.classList.contains('has-entered');

				if (!hasEntered) {
					this._enter(item);
				}
			}
		});
	}

	_init() {
		this.elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(this.elements, (item) => {
			this._setInitialStyles(item);

			if (this._isInView(item)) {
				window.addEventListener('load', () => {
					this.enter(item);
				}, false);
			}
		});
	}
}

export default ScrollIn
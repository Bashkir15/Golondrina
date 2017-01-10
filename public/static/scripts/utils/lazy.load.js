class lazy {
	constructor(options) {
		this.elements = null;

		this.defaults = {
			duration: '1000',
			distance: '200',
			heightOffset: 200
		};

		this.enter = this._enter.bind(this);
		this.init = this._init.bind(this);
		this.viewPortChange = this._viewPortChange.bind(this);
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

	_isInView(elem) {
		var rect = elem.getBoundingClientRect();

		return(
			((rect.top + this.defaults.heightOffset) >= 0 && (rect.top + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.bottom + this.defaults.heightOffset) >= 0 && (rect.bottom + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.bottom + this.defaults.heightOffset) < 0 && (rect.bottom + this.defaults.heightOffset) > window.innerHeight)
		);
	}


	_enter(elem) {
		let src = elem.getAttribute('data-src');

		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.classList.add("has-entered");

		elem.src = src;
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
		this.elements = document.querySelectorAll('.lazy');

		Array.prototype.map.call(this.elements, (item) => {

			if (this._isInView(item)) {
				window.addEventListener('load', () => {
					this.enter(item);
				}, false);
			}
		});
	}
}

export default lazy
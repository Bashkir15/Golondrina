class modal {
	constructor(options) {
		this.dialog = null;
		this.overlay = null;
		this.closeButton = null;

		this.defaults = {
			className: 'dialog-effect',
			content: "",
			overlay: true,
			closeKeys: [27],
			closeButton: true,
			onBeforeOpen: null,
			onBeforeClose: null,
			transitions: true,
			onOpen: null,
			onClose:null
		};

		this._applySettings(options);
		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
		//this.transitionEnd = this._transitionSniff();
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

	_open() {
		document.body.classList.add('dialog-open');
		this._buildOut.call(this);
		this._checkOverflow.call(this);

		this.dialog.classList.add('dialog-open');
		this.overlay.classList.add('dialog-open');

		this._checkOverflow.call(this);
		this._attachEvents();
	}

	_close() {
		this.overlay.classList.remove('dialog-open');
		this.dialog.classList.remove('dialog-open');
		document.body.classList.remove('dialog-open');

		this._destroyEvents();

		this.overlay.addEventListener('transitionend', () => {
			this.overlay.parentNode.removeChild(this.overlay);
		});
	}

	_buildOut() {
		var content;
		var contentHolder = document.createElement('div');
		contentHolder.classList.add('dialog-content');

		this.overlay = document.createElement('div');
		this.overlay.classList.add('dialog-overlay');

		this.dialog = document.createElement('div');
		this.dialog.classList.add('dialog');

		if (typeof this.defaults.content === 'string') {
			content = this.defaults.content;
		} else {
			content = this.defaults.content.innerHTML;
		}

		if (this.defaults.closeButton === true) {
			this.closeButton = document.createElement('button');
			this.closeButton.innerHTML = 	`<span class='icon-close'>X</span>`;
			this.closeButton.classList.add('dialog-close-button');
			this.dialog.appendChild(this.closeButton);
		}

		contentHolder.innerHTML = content;
		this.dialog.appendChild(contentHolder);
		this.overlay.appendChild(this.dialog);
		document.body.insertBefore(this.overlay, document.body.firstChild);

	}

	/* _transitionSniff() {
		if (this.defaults.transitions === false) {
			return;
		}

		var el = document.createElement('div');
		var transitions = {
			'transition': 'transitionend',
			'OTransition': 'otransitionend',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		};

		for (var i in transitions) {
			if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
				return transitions[i];
			}
		}

	}

	_open() {
		if (typeof this.defaults.onBeforeOpen === 'function') {
			this.defaults.onBeforeOpen.call(this, e);
		}

		this._buildOut.call(this);
		this._checkOverflow.call(this);

		/* window.getComputedStyle(this.dialog).height;
		if (this.dialog.offsetHeight > window.innerHeight) {
			this.dialog.classList.add('dialog-anchored');
			this.dialog.style.top = 20 + "px";
		} 

		this.dialog.classList.add('dialog-open');
		this.overlay.classList.add('dialog-open');
		document.body.classList.add('dialog-open');
		
		//document.querySelector('.landing-page-content').classList.add('dialog-open');

		document.body.style.overflowY = 'hidden';
		this._checkOverflow.call(this);

		this._attachEvents();

		if (typeof this.defaults.onOpen === 'function') {
			this.defaults.onOpen.call(this, e);
		}
	}

	_close() {

		if (typeof this.defaults.onBeforeClose === 'function') {
			this.defaults.onBeforeClose.call(this, e);
		}

		this.dialog.className = this.dialog.className.replace(" dialog-open", "");
		this.overlay.className = this.overlay.className.replace(" dialog-open", "");
		document.querySelector('.landing-page-content').classList.remove('dialog-open');
		document.body.style.overflowY = 'auto';

		this._destroyEvents();

		this.dialog.addEventListener('transitionend', () => {
			this.dialog.parentNode.removeChild(this.dialog);
		}, false);

		this.overlay.addEventListener('transitionend', () => {
			this.overlay.parentNode.removeChild(this.overlay);
		}, false);

		document.body.style.height = 'auto';
		document.body.style.overflowY = 'auto';

		if (typeof this.defaults.onClose === 'function') {
			this.defaults.onClose.call(this, e);
		}
	}

	_buildOut() {
		let content;
		let contentHolder;
		let docFrag;

		if (typeof this.defaults.content === 'string') {
			content = this.defaults.content;
		} else {
			content = this.defaults.content.innerHTML;
		}

		docFrag = document.createDocumentFragment();

		this.dialog = document.createElement("div");
		this.dialog.className = 'dialog ' + this.defaults.className;


		//this.dialog.style.top = window.pageYOffset + (window.innerHeight / 2) + "px";
		//this.dialog.style.left = (window.innerWidth + this.dialog.offsetWidth) / 2 + "px";

		if (this.defaults.closeButton === true) {
			this.closeButton = document.createElement('button');
			this.closeButton.innerHTML = 	`<span class='icon-close'>X</span>`;
			this.closeButton.classList.add('dialog-close-button');
			this.dialog.appendChild(this.closeButton);
		}

		if (this.defaults.overlay === true) {
			this.overlay = document.createElement('div');
			this.overlay.className = "dialog-overlay " + this.defaults.className;
			docFrag.appendChild(this.overlay);
		}

		contentHolder = document.createElement('div');
		contentHolder.className = "dialog-content";
		contentHolder.innerHTML = content;
		this.dialog.appendChild(contentHolder);
		docFrag.appendChild(this.dialog);
		document.body.appendChild(docFrag);
	} */

	_isOverflow() {
		var viewportHeight = window.innerHeight;
		var dialogHeight = this.dialog.clientHeight;
		var isOverflow = dialogHeight < viewportHeight ? false : true;

		return isOverflow;
	}

	_checkOverflow() {
		if (this.dialog.classList.contains('dialog-open')) {
			if (this._isOverflow()) {
				this.overlay.classList.add('dialog-overflow');
			} else {
				this.overlay.classList.remove('dialog-overflow');
			}
		}
	}

	_closeKeyHandler(e) {
		if (this.defaults.closeKeys.indexOf(e.which) > -1) {
			e.preventDefault();
			this.close();
		}
	}

	_attachEvents() {
		let _closeKeyHandler = this._closeKeyHandler.bind(this);

		this.overlay.addEventListener('click', this.close, false);
		
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close);
		}

		document.body.addEventListener('keydown', _closeKeyHandler, false);
	}

	_destroyEvents() {
		let _closeKeyHandler = this._closeKeyHandler.bind(this);

		this.overlay.removeEventListener('click', this.close);
		this.closeButton.removeEventListener('click', this.close);
		document.body.addEventListener('keydown', _closeKeyHandler);
	} 
}

export default modal
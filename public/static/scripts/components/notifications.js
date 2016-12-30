class notifications {
	constructor(options) {
		this.container = null;
		this.count = 0;

		this.defaults = {
			notification: null,
			timeout: 0,
			type: 'alert',
			content: "",
			posX: 'right',
			posY: 'bottom'
		}

		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
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

	_open() {
		var notifyId = "notification-" + this.count;

		this._buildOut.call(this);

		setTimeout(() => {
			this.container.classList.add('shown');
			this.container.setAttribute('id', notifyId);
		}, 100);

		if (this.defaults.timeout > 0) {
			setTimeout(() => {
				this.close(notifyId);
			}, this.defaults.timeout);
		}

		this.count += 1;

		return notifyId;
	}

	_close(notificationId) {
		var notification = document.getElementById(notificationId);

		if (notification) {
			notification.classList.remove('shown');

			setTimeout(() => {
				notification.parentNode.removeChild(notification);
			}, 600);

			return true;
		} else {
			return false;
		}
	}

	_buildOut() {
		var _container = document.createElement('div');
		var _contentHolder = document.createElement('div');
		var _content;

		_container.className = 'notification-container';
		_contentHolder.className = 'notification';

		this.container = _container;
		this.container.style.position = "fixed";

		if (this.defaults.content === 'string') {
			_content = this.defaults.content;
		} else {
			_content = this.defaults.content.innerHTML;
		}

		this._checkType(_contentHolder);
		this._checkPosition();

		_contentHolder.innerHTML = _content;
		this.container.appendChild(_contentHolder);
		document.body.appendChild(this.container);
	}

	_checkType(item) {
		switch (this.defaults.type) {
			case "success":
				item.classList.add('success');
				break;
			case "danger":
				item.classList.add('danger');
				break;
			case "warning":
				item.classList.add('warning');
				break;
			case "alert":
				item.classList.add('alert');
			default:
				item.classList.add('alert');
		}
	}

	_checkPosition() {
		switch(this.defaults.posX) {
			case "right":
				this.container.style.right = 20 + "px";
				break;
			case "left":
				this.container.style.left = 20 + "px";
				break;
			default:
				this.container.style.right = 20 + "px";
		}

		switch(this.defaults.posY) {
			case "top":
				this.container.style.top = 20 + "px";
				break;
			case "bottom":
				this.container.style.bottom = 20 + "px";
				break;
			default:
				this.container.style.bottom = 20 + "px";
		}
	}
}

export default notifications
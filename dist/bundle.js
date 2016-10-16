/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mobile = __webpack_require__(1);

	var _mobile2 = _interopRequireDefault(_mobile);

	var _scroll = __webpack_require__(3);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _landing = __webpack_require__(4);

	var _landing2 = _interopRequireDefault(_landing);

	var _contact = __webpack_require__(6);

	var _contact2 = _interopRequireDefault(_contact);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navTrigger = document.getElementById('nav-trigger');

	function openMobileMenu() {
		var menu = new _mobile2.default();

		if (!navTrigger.classList.contains('open')) {
			navTrigger.classList.add('open');
			menu.toggle();
		} else {
			navTrigger.classList.remove('open');
			menu.toggle();
		}
	}

	if (navTrigger != 'undefined') {
		navTrigger.addEventListener('click', openMobileMenu, false);
	}

	(0, _scroll2.default)();

	if (window.location.href.indexOf('portfolio') != -1) {
		console.log('portfolio');
	} else if (window.location.href.indexOf('contact') != -1) {
		(0, _contact2.default)();
	} else {
		(0, _landing2.default)();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MobileMenu = function () {
		function MobileMenu() {
			_classCallCheck(this, MobileMenu);

			this.container = document.getElementById('mobile-menu-container');
			this.menu = document.getElementById('mobile-menu');
			this.toggle = this._toggle.bind(this);
			this.animatedClass = 'mobile-menu-container--animatable';
			this.openClass = 'mobile-menu-container--open';
		}

		_createClass(MobileMenu, [{
			key: '_toggle',
			value: function _toggle() {
				this.menu.style.willChange = 'opacity';
				_dom2.default.addClass(this.container, this.animatedClass);

				if (_dom2.default.hasClass(this.container, this.animatedClass) && !_dom2.default.hasClass(this.container, this.openClass)) {
					document.body.style.overflowY = 'hidden';
					document.body.style.position = 'fixed';
					_dom2.default.addClass(this.container, this.openClass);
					this._updateNav();
					this._addEvents();
				} else {
					document.body.style.overflowY = 'auto';
					document.body.style.position = 'relative';
					_dom2.default.removeClass(this.container, this.openClass);
					this._updateNav();
					this._addEvents();
				}

				this.menu.style.willChange = 'auto';
			}
		}, {
			key: '_updateNav',
			value: function _updateNav() {
				var nav = document.getElementById('nav');

				if (_dom2.default.hasClass(this.container, this.openClass)) {
					nav.classList.add('nav-mobile--open');
				} else {
					nav.classList.remove('nav-mobile--open');
				}
			}
		}, {
			key: '_whichTransitionEvent',
			value: function _whichTransitionEvent() {
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
		}, {
			key: '_onTransitionEnd',
			value: function _onTransitionEnd() {
				this.container.classList.remove('mobile-menu-container--animatable');
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var onTransitionEnd = this._onTransitionEnd.bind(this);
				var transitionEvent = this._whichTransitionEvent();

				this.container.addEventListener('transitionend', onTransitionEnd);
			}
		}]);

		return MobileMenu;
	}();

	exports.default = MobileMenu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var mod = {};

	mod.addClass = function (element, newClass) {
		if (element.classList.contains(newClass)) {
			return;
		} else {
			element.classList.add(newClass);
		}
	};

	mod.removeClass = function (element, oldClass) {
		if (!element.classList.contains(oldClass)) {
			return;
		} else {
			element.classList.remove(oldClass);
		}
	};

	mod.hasClass = function (element, currentClass) {
		if (element.classList.contains(currentClass)) {
			return true;
		} else {
			return false;
		}
	};

	exports.default = mod;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function init() {
		window.addEventListener('scroll', function () {
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

	exports.default = init;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _scroll = __webpack_require__(5);

	var _scroll2 = _interopRequireDefault(_scroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function home() {
		var scrollEntrance = new _scroll2.default();
		var formContainer = document.getElementById('landing-form-wrapper');
		var formInput = document.getElementById('landing-email');
		var viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var test = 1;

		function onFocus() {
			if (!formContainer.classList.contains('landing-email--valid')) {
				formContainer.classList.add('landing-email--focused');
			} else {
				return;
			}
		}

		function onBlur() {
			var formContent = formInput.value;
			var atpos = formContent.indexOf('@');
			var dotpos = formContent.lastIndexOf(".");

			if (formContainer.classList.contains('landing-email--focused')) {
				formContainer.classList.remove('landing-email--focused');
			}

			if (formContent == "") {
				formContainer.classList.add('landing-email--blank');
			} else if (atpos < 1 || dotpos - atpos < 2) {

				if (formContainer.classList.contains('landing-email--blank')) {
					formContainer.classList.remove('landing-email--blank');
				}

				formContainer.classList.add('landing-email--invalid');
			} else {

				if (!formContainer.classList.contains('landing-email--valid')) {

					if (formContainer.classList.contains('landing-email--blank')) {
						formContainer.classList.remove('landing-email--blank');
					} else if (formContainer.classList.contains('landing-email--invalid')) {
						formContainer.classList.remove('landing-email--invalid');
					}

					formContainer.classList.add('landing-email--valid');
				}

				return true;
			}
		}

		document.addEventListener('DOMContentLoaded', function () {
			var slider = document.querySelector('.js_slider');

			lory(slider, {
				rewind: true,
				enableMouseEvents: true
			});
		});
		window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
		window.addEventListener('scroll', scrollEntrance.viewPortChange);
		window.addEventListener('resize', scrollEntrance.viewPortChange);
		formInput.addEventListener('focus', onFocus);
		formInput.addEventListener('blur', onBlur);
	}

	exports.default = home;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScrollIn = function () {
		function ScrollIn() {
			_classCallCheck(this, ScrollIn);

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

		_createClass(ScrollIn, [{
			key: '_isInView',
			value: function _isInView(elem) {
				var rect = elem.getBoundingClientRect();

				return rect.top + this.defaults.heightOffset >= 0 && rect.top + this.defaults.heightOffset <= window.innerHeight || rect.bottom + this.defaults.heightOffset >= 0 && rect.bottom + this.defaults.heightOffset <= window.innerHeight || rect.top + this.defaults.heightOffset < 0 && rect.bottom + this.defaults.heightOffset > window.innerHeight;
			}
		}, {
			key: '_setInitialStyles',
			value: function _setInitialStyles(elem) {
				var anim = elem.getAttribute('data-entrance');
				var delay = elem.getAttribute('data-entrance-delay');

				elem.style.transition = "all " + this.defaults.duration / 1000 + "s ease-out";

				if (delay) {
					elem.style.transitionDelay = delay / 1000 + 's';
				}

				if (anim == 'fade') {
					elem.style.opacity = '0';
				}
			}
		}, {
			key: '_enter',
			value: function _enter(elem) {
				elem.style.visibility = "visible";
				elem.style.opacity = "1";
				elem.style.transform = "translate(0,0)";
				elem.classList.add('has-entered');
			}
		}, {
			key: '_viewPortChange',
			value: function _viewPortChange() {
				var _this = this;

				Array.prototype.map.call(this.elements, function (item) {
					var isInView = _this._isInView(item);

					if (isInView) {
						var hasEntered = item.classList.contains('has-entered');

						if (!hasEntered) {
							_this._enter(item);
						}
					}
				});
			}
		}, {
			key: '_init',
			value: function _init() {
				var _this2 = this;

				this.elements = document.querySelectorAll('[data-entrance]');

				Array.prototype.map.call(this.elements, function (item) {
					_this2._setInitialStyles(item);

					if (_this2._isInView(item)) {
						window.addEventListener('load', function () {
							_this2.enter(item);
						}, false);
					}
				});
			}
		}]);

		return ScrollIn;
	}();

	exports.default = ScrollIn;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _notifications = __webpack_require__(7);

	var _notifications2 = _interopRequireDefault(_notifications);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function contact() {
		var formWrappers = document.querySelectorAll('.contact-form-wrapper');
		var formInputs = document.querySelectorAll('.contact-form-input');
		var submitButton = document.getElementById('contact-send');
		var successContent = document.getElementById('contact-success');
		var failureContent = document.getElementById('contact-failure');
		var errorContent = document.getElementById('contact-error');

		/*	function onFocus() {
	 		var i = 0;
	 		for (i; i < formWrapper.length; i++) {
	 			formWrappers[i].addEventListener('focus', () => {
	 				for (k = 0; k < formInputs.length; k++) {
	 
	 				}
	 			})
	 		}
	 	}
	 
	 	function formFocus() {
	 		for (var k = 0; k < formWrappers.length; k++) {
	 			formWrappers[k].classList.add('contact--focused');
	 		}
	 	} */

		function onFocus() {
			Array.prototype.forEach.call(formInputs, function (input) {
				input.addEventListener('focus', inputFocus);
			});
		}

		function inputFocus() {
			if (!this.parentNode.classList.contains('focused')) {
				this.parentNode.classList.add('focused');
			} else {
				return;
			}
		}

		function onBlur() {
			Array.prototype.forEach.call(formInputs, function (input) {
				input.addEventListener('blur', inputBlur);
			});
		}

		function inputBlur() {
			var formContent = this.value;

			if (this.parentNode.classList.contains('focused')) {
				this.parentNode.classList.remove('focused');
			}

			if (formContent == '') {
				this.parentNode.classList.add('blank');
			}

			if (this.parentNode.classList.contains('contact-form-email')) {
				validateEmail();
			}

			if (this.parentNode.classList.contains('contact-form-number')) {
				validatePhone();
			}

			if (formContent != '' && !this.parentNode.classList.contains('contact-form-email') && !this.parentNode.classList.contains('contact-form-number')) {
				if (this.parentNode.classList.contains('blank')) {
					this.parentNode.classList.remove('blank');
				}

				this.parentNode.classList.add('valid');
			}

			checkValidForm();
		}

		function validateEmail() {
			var input = document.getElementById('contact-email');
			var formValue = input.value;
			var atpos = formValue.indexOf('@');
			var dotpos = formValue.lastIndexOf(".");

			if (atpos < 1 || dotpos - atpos < 2) {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				input.parentNode.classList.add('email-invalid');
			} else {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				if (input.parentNode.classList.contains('email-invalid')) {
					input.parentNode.classList.remove('email-invalid');
				}

				input.parentNode.classList.add('email-valid');
			}
		}

		function validatePhone() {
			var input = document.getElementById('contact-number');
			var formValue = input.value;
			var phoneRe = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
			if (!formValue.match(phoneRe) || formValue == '') {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				if (input.parentNode.classList.contains('phone-valid')) {
					input.parentNode.classList.remove('phone-valid');
				}

				input.parentNode.classList.add('phone-invalid');
			} else if (formValue.match(phoneRe)) {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				if (input.parentNode.classList.contains('phone-invalid')) {
					input.parentNode.classList.remove('phone-invalid');
				}

				input.parentNode.classList.add('phone-valid');
			} else {
				console.log('weird');
			}
		}

		function checkValidForm() {
			var validForm = 0;
			Array.prototype.forEach.call(formWrappers, function (wrapper) {
				if (wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid') || wrapper.classList.contains('phone-valid')) {
					validForm++;
				}
			});

			if (validForm == 4) {
				var submitButton = document.getElementById('contact-send');
				submitButton.classList.add('contact-form-valid');
			}
		}

		function sendMessage() {
			var submitButton = document.getElementById('contact-send');

			if (submitButton.classList.contains('contact-form-valid')) {
				submitButton.classList.add('contact-show-loading');

				var data = {};
				data.name = document.getElementById('contact-name');
				data.email = document.getElementById('contact-email');
				data.phone = document.getElementById('contact-number');
				data.message = document.getElementById('contact-message');

				var promise = new Promise(function (resolve, reject) {
					var req = new XMLHttpRequest();

					req.open('POST', '/contact', true);
					req.onload = function () {
						if (req.status == 200) {
							resolve(req.response);
						} else {
							reject(Error(req.statusText));
						}
					};

					req.onError = function () {
						reject(Error('Error'));
					};

					req.send();
				});

				promise.then(function (response) {
					if (response.success) {
						submitButton.classList.remove('contact-show-loading');
						var success = new Event('message-delivered');
						window.dispatchEvent(success);
					} else {
						submitButton.classList.remove('contact-show-loading');
						var failure = new Event('message-failed');
						window.dispatchEvent(failure);
					}
				}, function (error) {
					console.log('Failed');
				});
			} else {
				var sendError = new Event('sending-failed');
				window.dispatchEvent(sendError);
			}
		}

		var successNotify = new _notifications2.default({
			content: successContent,
			timeout: 1000,
			type: 'success'
		});

		var failureNotify = new _notifications2.default({
			content: failureContent,
			timeout: 1000,
			type: 'danger'
		});

		var errorNotfy = new _notifications2.default({
			content: errorContent,
			type: 'warning'
		});

		onFocus();
		onBlur();

		submitButton.addEventListener('click', sendMessage);
		//	window.addEventListener('message-delivered', successNotify.open);
		//	window.addEventListener('message-failed', failureNotify.open);
		window.addEventListener('sending-failed', errorNotfy.open);
	}

	exports.default = contact;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var notifications = function () {
		function notifications(options) {
			_classCallCheck(this, notifications);

			this.settings = {
				container: null,
				notification: null,
				timeout: 0,
				type: 'alert',
				content: "",
				posX: 'right',
				posY: 'bottom'
			};

			this.count = 0;
			this._applySettings(options);
			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(notifications, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.settings[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_buildOut',
			value: function _buildOut() {
				var _container = document.createElement('div');
				var _contentHolder = document.createElement('div');
				var _content;

				_container.className = 'notification-container';
				_contentHolder.className = 'notification';

				this.settings.container = _container;
				this.settings.container.style.position = "fixed";

				if (this.settings.content === "string") {
					_content = this.settings.content;
				} else {
					_content = this.settings.content.innerHTML;
				}

				this._checkOptions(_contentHolder);

				_contentHolder.innerHTML = _content;
				this.settings.container.appendChild(_contentHolder);
				document.body.appendChild(this.settings.container);
			}
		}, {
			key: '_checkOptions',
			value: function _checkOptions(item) {
				switch (this.settings.type) {
					case "success":
						item.classList.add('success');
						break;
					case "danger":
						item.classList.add('danger');
						break;
					case "warning":
						item.classList.add('warning');
						break;
					default:
						item.classList.add('alert');
				}

				switch (this.settings.posX) {
					case "right":
						this.settings.container.style.right = 20 + "px";
						break;
					case "left":
						this.settings.container.style.left = 20 + "px";
						break;
					default:
						this.settings.container.style.right = 20 + "px";
				}

				switch (this.settings.posY) {
					case "top":
						this.settings.container.style.top = 20 + "px";
						break;
					case "bottom":
						this.settings.container.style.bottom = 20 + "px";
						break;
					default:
						this.settings.container.style.bottom = 20 + "px";
				}
			}
		}, {
			key: '_open',
			value: function _open() {
				var _this = this;

				var notifyId = "notification-" + this.count;
				this._buildOut.call(this);

				setTimeout(function () {
					_this.settings.container.classList.add('shown');
					_this.settings.container.setAttribute('id', notifyId);
				}, 100);

				if (this.settings.timeout > 0) {
					setTimeout(function () {
						_this.close(notifyId);
					}, this.settings.timeout);
				}

				this.count += 1;

				return notifyId;
			}
		}, {
			key: '_close',
			value: function _close(notificationId) {
				var notification = document.getElementById(notificationId);

				if (notification) {
					notification.classList.remove('shown');

					setTimeout(function () {
						notification.parentNode.removeChild(notification);
					}, 600);

					return true;
				} else {
					return false;
				}
			}
		}]);

		return notifications;
	}();

	exports.default = notifications;

/***/ }
/******/ ]);
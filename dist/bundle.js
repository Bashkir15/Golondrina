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

	var _mobileMenu = __webpack_require__(1);

	var _mobileMenu2 = _interopRequireDefault(_mobileMenu);

	var _scroll = __webpack_require__(2);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _landing = __webpack_require__(3);

	var _gallery = __webpack_require__(32);

	var _contact = __webpack_require__(38);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navTrigger = document.getElementById('nav-trigger');
	var navLinks = document.querySelectorAll('.nav-link');
	var nav = document.getElementById('nav');

	var menu = new _mobileMenu2.default();
	var scroller = new _scroll2.default();

	var scrollTimeout = void 0;
	var resizeTimeout = void 0;

	if (navTrigger != 'undefined') {
		navTrigger.addEventListener('click', menu.toggle, false);
	}

	function activeUrl() {
		var pathNames = ['/contact', '/gallery'];

		Array.prototype.forEach.call(navLinks, function (link) {
			if (pathNames.indexOf(link.getAttribute("href")) != -1 && link.getAttribute("href") == window.location.pathname) {
				link.classList.add('active');
				nav.classList.add('normal-nav');
			} else if (link.getAttribute("href") == window.location.pathname) {
				link.classList.add('active');
			}
		});
	}

	function scrollThrottle() {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(function () {
				scrollTimeout = null;
				scroller.viewPortChange();
			});
		}
	}

	function resizeThrottle() {
		if (!resizeTimeout) {
			resizeTimeout = setTimeout(function () {
				resizeTimeout = null;
				scroller.viewPortChange();
			}, 250);
		}
	}

	if (window.location.href.indexOf('portfolio') != -1) {
		//	portfolio();
	} else if (window.location.href.indexOf('contact') != -1) {
		(0, _contact.contact)();
	} else if (window.location.href.indexOf('gallery') != -1) {
		(0, _gallery.gallery)();
	} else {
		(0, _landing.landing)();
	}

	activeUrl();

	window.addEventListener('DOMContentLoaded', scroller.init, false);
	window.addEventListener('scroll', scrollThrottle, false);
	window.addEventListener('resize', resizeThrottle, false);

	window.onload = function () {
		setTimeout(function () {
			document.body.classList.add('loaded');
		}, 1000);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mobileMenu = function () {
		function mobileMenu(options) {
			_classCallCheck(this, mobileMenu);

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

		_createClass(mobileMenu, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.defaults[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_toggle',
			value: function _toggle() {
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
		}, {
			key: '_updateNav',
			value: function _updateNav() {
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
		}, {
			key: '_closeKeyHandler',
			value: function _closeKeyHandler(e) {
				if (this.container.classList.contains(this.defaults.openClass)) {
					if (this.defaults.closeKeys.indexOf(e.which) > -1) {
						e.preventDefault();
						this.toggle();
					}
				}
			}
		}, {
			key: '_onTransitionEnd',
			value: function _onTransitionEnd() {
				this.container.classList.remove(this.defaults.animatedClass);
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var onTransitionEnd = this._onTransitionEnd.bind(this);
				var closeKeyHandler = this._closeKeyHandler.bind(this);

				this.container.addEventListener('transitionend', onTransitionEnd);
				document.body.addEventListener('keydown', closeKeyHandler);
			}
		}, {
			key: '_removeEvents',
			value: function _removeEvents() {
				var onTransitionEnd = this._onTransitionEnd.bind(this);
				var closeKeyHandler = this._closeKeyHandler.bind(this);

				this.container.removeEventListener('transitionend', onTransitionEnd);
				document.body.removeEventListener('keydown', closeKeyHandler);
			}
		}]);

		return mobileMenu;
	}();

	exports.default = mobileMenu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var scrollIn = function () {
		function scrollIn(options) {
			_classCallCheck(this, scrollIn);

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

		_createClass(scrollIn, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.defaults[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_isInView',
			value: function _isInView(elem) {
				var rect = elem.getBoundingClientRect();

				return rect.top + this.defaults.heightOffset >= 0 && rect.top + this.defaults.heightOffset <= window.innerHeight || rect.bottom + this.defaults.heightOffset >= 0 && rect.bottom + this.defaults.heightOffset <= window.innerHeight || rect.bottom + this.defaults.heightOffset < 0 && rect.bottom + this.defaults.heightOffset > window.innerHeight;
			}
		}, {
			key: '_setInitialStyles',
			value: function _setInitialStyles(elem) {
				var anim = elem.getAttribute('data-entrance');
				var delay = elem.getAttribute('data-entray-delay');

				elem.style.transition = "all " + this.defaults.duration / 1000 + "s ease-out";

				if (delay) {
					elem.style.transitionDelay = delay / 1000 + 's';
				}

				if (anim == 'fade') {
					elem.style.opacity = 0;
				}
			}
		}, {
			key: '_enter',
			value: function _enter(elem) {
				elem.style.visibility = "visible";
				elem.style.opacity = "1";
				elem.style.transform = "translate(0,0)";
				elem.classList.add("has-entered");
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

		return scrollIn;
	}();

	exports.default = scrollIn;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.landing = landing;

	var _notifications = __webpack_require__(4);

	var _notifications2 = _interopRequireDefault(_notifications);

	var _axios = __webpack_require__(5);

	var _axios2 = _interopRequireDefault(_axios);

	var _validator = __webpack_require__(31);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function landing() {
		var input = document.querySelectorAll('.form-input');
		var formWrapper = document.getElementById('landing-form-wrapper');
		var email = document.getElementById('landing-email');
		var signupButton = document.getElementById('signup-button');

		var successContent = document.getElementById('newsletter-success');
		var failureContent = document.getElementById('newsletter-failure');
		var errorContent = document.getElementById('newsletter-error');

		function newsletter() {
			console.log('meh');
			if (formWrapper.classList.contains('email-valid')) {
				signupButton.classList.add('form-loading');

				var data = {};
				data.email = email.value;

				_axios2.default.post('localhost:8000/contact/newsletter', {
					email: data.email,

					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function (response) {
					if (response.data.success) {
						resetForm();
						signupButton.classList.remove('form-loading');
						signupButton.classList.add('form-success');

						var success = new Event('newsletter-success');
						window.dispatchEvent(success);

						setTimeout(function () {
							formWrapper.classList.remove('email-valid');
							signupButton.classList.remove('form-success');
						}, 1000);
					} else {
						signupButton.classList.remove('form-loading');

						var failure = new Event('newsletter-failure');
						window.dispatchEvent(failure);
					}
				});
			} else {
				var error = new Event('newsletter-error');
				window.dispatchEvent(error);
			}
		}

		function resetForm() {
			email.value = "";
		}

		(0, _validator.onBlur)(input);

		var newsletterSuccess = new _notifications2.default({
			content: successContent,
			type: 'success',
			timeout: 2500
		});

		var newsletterFailure = new _notifications2.default({
			content: failureContent,
			type: 'danger',
			timeout: 2500
		});

		var newsletterError = new _notifications2.default({
			content: errorContent,
			type: 'warning',
			timeout: 2500
		});

		window.addEventListener('newsletter-success', newsletterSuccess.open, false);
		window.addEventListener('newsletter-failure', newsletterFailure.open, false);
		window.addEventListener('newsletter-error', newsletterError.open, false);
		signupButton.addEventListener('click', newsletter, false);
	}

/***/ },
/* 4 */
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

			this.container = null;
			this.count = 0;

			this.defaults = {
				notification: null,
				timeout: 0,
				type: 'alert',
				content: "",
				posX: 'right',
				posY: 'bottom'
			};

			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
			this._applySettings(options);
		}

		_createClass(notifications, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.defaults[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_open',
			value: function _open() {
				var _this = this;

				var notifyId = "notification-" + this.count;

				this._buildOut.call(this);

				setTimeout(function () {
					_this.container.classList.add('shown');
					_this.container.setAttribute('id', notifyId);
				}, 100);

				if (this.defaults.timeout > 0) {
					setTimeout(function () {
						_this.close(notifyId);
					}, this.defaults.timeout);
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
		}, {
			key: '_buildOut',
			value: function _buildOut() {
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
		}, {
			key: '_checkType',
			value: function _checkType(item) {
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
		}, {
			key: '_checkPosition',
			value: function _checkPosition() {
				switch (this.defaults.posX) {
					case "right":
						this.container.style.right = 20 + "px";
						break;
					case "left":
						this.container.style.left = 20 + "px";
						break;
					default:
						this.container.style.right = 20 + "px";
				}

				switch (this.defaults.posY) {
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
		}]);

		return notifications;
	}();

	exports.default = notifications;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);
	var bind = __webpack_require__(8);
	var Axios = __webpack_require__(9);
	var defaults = __webpack_require__(10);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(28);
	axios.CancelToken = __webpack_require__(29);
	axios.isCancel = __webpack_require__(25);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(30);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(8);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(10);
	var utils = __webpack_require__(7);
	var InterceptorManager = __webpack_require__(22);
	var dispatchRequest = __webpack_require__(23);
	var isAbsoluteURL = __webpack_require__(26);
	var combineURLs = __webpack_require__(27);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(7);
	var normalizeHeaderName = __webpack_require__(12);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(13);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(13);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(7);
	var settle = __webpack_require__(14);
	var buildURL = __webpack_require__(17);
	var parseHeaders = __webpack_require__(18);
	var isURLSameOrigin = __webpack_require__(19);
	var createError = __webpack_require__(15);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(20);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(21);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(15);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(16);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);
	var transformData = __webpack_require__(24);
	var isCancel = __webpack_require__(25);
	var defaults = __webpack_require__(10);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(28);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.onBlur = onBlur;
	exports.removeBlur = removeBlur;
	function onBlur(nodes) {
		Array.prototype.forEach.call(nodes, function (node) {
			node.addEventListener('blur', inputBlur);
		});
	}

	function removeBlur(nodes) {
		Array.prototype.forEach.call(nodes, function (node) {
			node.removeEventListener('blur', inputBlur);
		});
	}

	function validateEmail(node) {
		var value = node.value;
		var atpos = value.indexOf('@');
		var dotpos = value.lastIndexOf('.');

		if (atpos < 1 || dotpos - atpos < 2) {
			if (node.parentNode.classList.contains('blank')) {
				node.parentNode.classList.remove('blank');
			}

			node.parentNode.classList.add('email-invalid');
		} else {
			if (node.parentNode.classList.contains('blank')) {
				node.parentNode.classList.remove('blank');
			}

			if (node.parentNode.classList.contains('email-invalid')) {
				node.parentNode.classList.remove('email-invalid');
			}

			node.parentNode.classList.add('email-valid');
		}
	}

	function inputBlur() {
		var formContent = this.value;

		if (formContent == '') {
			this.parentNode.classList.add('blank');
		}

		if (this.parentNode.classList.contains('form-email')) {
			validateEmail(this);
		}

		if (formContent != '' && !this.parentNode.classList.contains('form-email')) {
			if (this.parentNode.classList.contains('blank')) {
				this.parentNode.classList.remove('blank');
			}

			this.parentNode.classList.add('valid');
		}

		checkValidForm();
	}

	function checkValidForm() {
		var formWrappers = document.querySelectorAll('.form-wrapper');
		var submitButton = document.querySelector('.form-send');
		var valid = 0;

		Array.prototype.forEach.call(formWrappers, function (wrapper) {
			if (wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid')) {
				valid++;
			}
		});

		if (valid == 4) {
			submitButton.classList.add('form-valid');
		}
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.gallery = gallery;

	var _tabs = __webpack_require__(33);

	var _images = __webpack_require__(34);

	var _windows = __webpack_require__(35);

	var _windows2 = _interopRequireDefault(_windows);

	var _residential = __webpack_require__(36);

	var _residential2 = _interopRequireDefault(_residential);

	var _canvas = __webpack_require__(37);

	var _canvas2 = _interopRequireDefault(_canvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function gallery() {
		var windowsContainer = document.querySelector('.gallery');
		var canvasContainer = document.querySelector('.gallery-2');
		var residentialContainer = document.querySelector('.gallery-3');
		var galleryLinks = document.querySelectorAll('.tab-link');

		var windowGallery = (0, _images.buildGallery)(_windows2.default);
		var originalWindowLength = windowGallery.length;
		var loadWindowsButton = document.getElementById('load-more-windows');
		var windowsVisible = [];

		var residentialGallery = (0, _images.buildGallery)(_residential2.default);
		var loadResidentialButton = document.getElementById('load-more-residential');
		var residentialVisible = [];

		var canvasGallery = (0, _images.buildGallery)(_canvas2.default);
		var loadCanvasButton = document.getElementById('load-more-canvas');
		var canvasVisible = [];

		loadMoreWindows();
		(0, _tabs.tabs)();

		Array.prototype.forEach.call(galleryLinks, function (link) {
			if (!link.classList.contains('gallery-loaded')) {
				(function () {

					var clickHandler = function clickHandler() {
						setupGallery(link);

						setTimeout(function () {
							link.removeEventListener('click', clickHandler, false);
						}, 1000);
					};

					link.addEventListener('click', clickHandler, false);
				})();
			}
		});

		function setupGallery(item) {
			if (item.classList.contains('canvas-link')) {
				loadMoreCanvas();
			} else if (item.classList.contains('residential-link')) {
				loadMoreResidential();
			}
		}

		function loadMoreWindows() {
			var page = page || 0;
			if (windowGallery.length != windowsVisible.length) {
				(0, _images.buildImages)(windowGallery, windowsVisible, windowsContainer, page);
				page++;
			}

			if (originalWindowLength == windowsVisible.length) {
				loadWindowsButton.classList.add('no-more-images');
				loadWindowsButton.removeEventListener('click', loadMoreWindows);
			}
		}

		function loadMoreResidential() {
			var page = page || 0;
			(0, _images.buildImages)(residentialGallery, residentialVisible, residentialContainer, page);
			page++;
		}

		function loadMoreCanvas() {
			var page = page || 0;
			(0, _images.buildImages)(canvasGallery, canvasVisible, canvasContainer, page);
			page++;
		}

		loadWindowsButton.addEventListener('click', loadMoreWindows, false);
		loadCanvasButton.addEventListener('click', loadMoreCanvas, false);
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tabs = tabs;
	function tabs() {
		var tabWidget = Array.prototype.slice.call(document.querySelectorAll('.js-tab')) || [];

		var tabClickEvent = function tabClickEvent(tabLink, tabLinks, tabPanels, linkIndex, e) {
			tabLinks.forEach(function (link) {
				link.setAttribute('tabindex', '-1');
				link.setAttribute('aria-selected', 'false');
				link.parentNode.removeAttribute('data-tab-active');
				link.removeAttribute('data-tab-active');
			});

			tabLink.setAttribute('tabindex', '0');
			tabLink.setAttribute('aria-selected', 'true');
			tabLink.parentNode.setAttribute('data-tab-active', '');
			tabLink.setAttribute('data-tab-active', '');

			tabPanels.forEach(function (panel, index) {
				if (index != linkIndex) {
					panel.setAttribute('aria-hidden', 'true');
					panel.removeAttribute('data-tab-active');
				} else {
					panel.setAttribute('aria-hidden', 'false');
					panel.setAttribute('data-tab-active', '');
				}
			});
		};

		var keyBoardEvent = function keyBoardEvent(tabLink, tabLinks, tabPanels, tabItems, index, e) {
			var keyCode = e.key || e.which,
			    currentTab = tabLinks[index],
			    previousTab = tabLinks[index - 1],
			    nextTab = tabLinks[index + 1],
			    firstTab = tabLinks[0],
			    lastTab = tabLinks[tabLinks.length - 1];

			switch (keyCode) {
				case 'ArrowLeft':
				case 37:
					e.preventDefault();

					if (!previousTab) {
						lastTab.focus();
					} else {
						previousTab.focus();
					}
					break;

				case 'ArrowRight':
				case 39:
					e.preventDefault();

					if (!nextTab) {
						firstTab.focus();
					} else {
						nextTab.focus();
					}
					break;
			}
		};

		tabWidget.forEach(function (tabWidgetInstance, i) {
			var tabList = tabWidgetInstance.getElementsByTagName('ul')[0],
			    tabItems = Array.prototype.slice.call(tabList.getElementsByTagName('li')),
			    tabLinks = [],
			    tabPanels = Array.prototype.slice.call(tabWidgetInstance.getElementsByTagName('section'));

			tabList.setAttribute('role', 'tablist');

			tabItems.forEach(function (item, index) {
				var link = item.getElementsByTagName('a')[0];

				tabLinks.push(link);

				item.setAttribute('role', 'presentation');

				if (index == 0) {
					item.setAttribute('data-tab-active', '');
				}
			});

			tabLinks.forEach(function (link, i) {
				var anchor = link.getAttribute('href').split("#")[1];
				var attributes = {
					'id': 'tab-link' + i,
					'role': 'tab',
					'tabIndex': '-1',
					'aria-selected': 'false',
					'aria-controls': anchor
				};

				if (i == 0) {
					attributes['aria-selected'] = 'true';
					attributes.tabIndex = '0';

					link.setAttribute('data-tab-active', '');
				}

				for (var key in attributes) {
					link.setAttribute(key, attributes[key]);
				}

				link.addEventListener('click', function (e) {
					e.preventDefault();
				});

				link.addEventListener('focus', function (e) {
					tabClickEvent(this, tabLinks, tabPanels, i, e);
				});

				link.addEventListener('keydown', function (e) {
					keyBoardEvent(link, tabLinks, tabPanels, tabItems, i, e);
				});
			});

			tabPanels.forEach(function (panel, i) {
				var nextTabLink = document.createElement('a'),
				    nextTabLinkIndex = i < tabPanels.length - 1 ? i + 1 : 0;

				var attributes = {
					'role': 'tabpanel',
					'aria-hidden': 'true',
					'aria-labelledyby': 'tab-link-' + i
				};

				nextTabLink.setAttribute('href', '#tab-link-' + nextTabLinkIndex);
				nextTabLink.textContext = 'Next Tab';
				panel.appendChild(nextTabLink);

				if (i == 0) {
					attributes['aria-hidden'] = 'false';
					panel.setAttribute('data-tab-active', '');
				}

				for (var key in attributes) {
					panel.setAttribute(key, attributes[key]);
				}
			});
		});
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function buildGallery(images) {
		var i = void 0;
		var len = void 0;
		var image = void 0;

		var galleryIamges = [];

		for (i = 0, len = images.length; i < len - 1; i++) {
			image = images[i];

			galleryIamges.push({
				src: image.src,
				caption: image.caption
			});
		}

		return galleryIamges;
	}

	function loadMoreImages(newest, visible, container) {
		return new Promise(function (resolve) {
			var i = void 0;
			var len = newest.length;

			var docFrag = document.createDocumentFragment();

			for (i = 0; i < len; i++) {
				var lightboxSrc = document.createElement('a');
				var image = document.createElement('img');
				lightboxSrc.setAttribute("href", newest[i].src);

				if (typeof newest[i].caption !== 'undefined') {
					image.setAttribute('alt', newest[i].caption);
				}

				docFrag.appendChild(lightboxSrc);
				lightboxSrc.appendChild(image);

				image.src = newest[i].src;
				visible.push(newest[i]);
			}

			container.appendChild(docFrag);

			resolve();
		});
	}

	function buildImages(gallery, galleryVisible, galleryContainer, page) {
		var imageContainer = galleryContainer;
		if (page == 0) {
			loadMoreImages(gallery.splice(0, 10), galleryVisible, imageContainer).then(restartGallery(imageContainer));
		} else if (page == 1) {
			loadMoreImages(gallery.splice(10, 20), galleryVisible, imageContainer).then(restartGallery(imageContainer));
		}
	}

	function restartGallery(container) {
		var gallery = container.className.split(" ")[0];

		baguetteBox.run('.' + gallery, {
			captions: function captions(element) {
				return element.getElementsByTagName('img')[0].alt;
			}
		});
	}

	exports.buildGallery = buildGallery;
	exports.loadMoreImages = loadMoreImages;
	exports.buildImages = buildImages;
	exports.restartGallery = restartGallery;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = [
		{
			"business": "Authentic-Yoga-Life",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_AuthenticYogaLife_30Days-min.jpg",
			"caption": "Authentic Yoga Life -- 30 Days"
		},
		{
			"business": "Authentic-Yoga-Life",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_AuthenticYogaLife_40days-min.jpg",
			"caption": "Authentic Yoga Life -- 40 Days"
		},
		{
			"business": "Back-Yard-On-Bell",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_BackYardOnBell_Christmas-min.jpg",
			"caption": "Back Yard On Bell -- Christmas"
		},
		{
			"business": "Back-Yard-On-Bell",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_BackYardOnBell_It'sAline02-min.jpg",
			"caption": "Back Yard On Bell -- It's Alive!"
		},
		{
			"business": "Back-Yard-On-Bell",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_BackYardOnBell_ItsAlive-min.jpg",
			"caption": "Back Yard On Bell -- It's Alive!"
		},
		{
			"business": "Cafe-Brazil",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_CafeBrazil_Christmas2015-min.jpg",
			"caption": "Cafe Brazil -- Christmas 2015"
		},
		{
			"business": "Dark-Age",
			"caregory": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_DarkAge_Christmas-min.jpg",
			"caption": "Dark Age -- Christmas"
		},
		{
			"business": "Dark-Age",
			"caregory": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_DarkAge_Lettering-min.jpg",
			"caption": "Dark Age -- Lettering"
		},
		{
			"business": "Discover-Denton",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_DiscoverCenton_Dod-min.jpg",
			"caption": "Discover Denton -- Day of the Dead"
		},
		{
			"business": "Discover-Denton",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_DiscoverDenton_Poets-min.jpg",
			"caption": "Discover Denton -- Dead Poets"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_Christmas2016-min.jpg",
			"caption": "Eastside -- Christmas 2016"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_CoffinRaces-min.jpg",
			"caption": "Eastside -- Coffin Races"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_DoD-min.jpg",
			"caption": "Eastside -- Day of the Dead"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_Dod2016-min.jpg",
			"caption": "Eastside -- Day of the Dead 2016"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_Flappy-min.jpg",
			"caption": "Eastside -- Flappy"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_Newyears-min.jpg",
			"caption": "Eastside -- New Years"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_Thanksgiving-min.jpg",
			"caption": "Eastside -- Thanksgiving"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Eastside_dod2015-min.jpg",
			"caption": "Eastside -- Day of the Dead 2015"
		},
		{
			"business": "Financial-Planning",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Finacialplanning_Winter-min.jpg",
			"caption": "Financial Planning -- Winter"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_GDAC_35Denton-min.jpg",
			"caption": "GDAC -- 35"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_GDAC_Dod-min.jpg",
			"caption": "GDAC -- Day of the Dead"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_GDAC_JLeeBday-min.jpg",
			"caption": "GDAC -- Jason Lee Birthday"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_GDAC_Winter-min.jpg",
			"caption": "GDAC -- Winter"
		},
		{
			"business": "Game-Changers",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_GameChangers_Christmas-min.jpg",
			"caption": "Game Changers -- Christmas"
		},
		{
			"business": "Gamestop",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Gamestop_Christmas-min.jpg",
			"caption": "Gamestop -- Christmas"
		},
		{
			"business": "Gamestop",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Gamestop_Creeper-min.jpg",
			"caption": "Gamestop -- Creeper"
		},
		{
			"business": "Gamestop",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Gamestop_Pokemon-min.jpg",
			"caption": "Gamestop -- Pokemon"
		},
		{
			"business": "Gamestop",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Gamestop_Riddler-min.jpg",
			"caption": "Gamestop -- Riddler"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_HarvestHouse_35Denton-min.jpg",
			"caption": "Harvest House -- 35"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_HarvestHouse_Christmas2015-min.jpg",
			"caption": "Harvest House -- Christmas 2015"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_HarvestHouse_Dod-min.jpg",
			"caption": "Harvest House -- Day of the Dead"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_HarvestHouse_MainSqueeze-min.jpg",
			"caption": "Harvest House -- Main Squeeze"
		},
		{
			"business": "Hoochies",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Hoochies_Christmas2014-min.jpg",
			"caption": "Hoochies -- Christmas 2014"
		},
		{
			"business": "Hoochies",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Hoochies_Dod-min.jpg",
			"caption": "Hoochies -- Day of the Dead"
		},
		{
			"business": "Hoochies",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Hoochies_Gold-min.jpg",
			"caption": "Hoochies -- Gold"
		},
		{
			"business": "Hoochies",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Hoochies_Jazz-min.jpg",
			"caption": "Hoochies -- Jazz"
		},
		{
			"business": "Jupiter-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_JupiterHouse_Dod-min.jpg",
			"caption": "Jupiter House -- Day of the Dead"
		},
		{
			"business": "Jupiter-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_JupiterHouse_Winter-min.jpg",
			"caption": "Jupiter House -- Winter"
		},
		{
			"business": "LaDiDa",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_LaDiDa_Christmas-min.jpg",
			"caption": "LadiDa -- Christmas"
		},
		{
			"business": "Mellow-Mushroom",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_MellosMushroom_DoD2-min.jpg",
			"caption": "Mellow Mushroom -- Day of the Dead"
		},
		{
			"business": "Mellow-Mushroom",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_MellowMushroom_Christmas2015-min.jpg",
			"caption": "Mellow Mushroom -- Christmas 2015"
		},
		{
			"business": "Mellow-Mushroom",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_MellowMushroom_Dod-min.jpg",
			"caption": "Mellow Mushroom -- Day of the Dead"
		},
		{
			"business": "Mellow-Mushroom",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_MellowMushroom_Dod2015_02-min.jpg",
			"caption": "Mellow Mushroom -- Day of the Dead 2015"
		},
		{
			"business": "Mellow-Mushroom",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_MellowMushroom_dod2015-min.jpg",
			"caption": "Mellow Mushroom -- Day of the Dead 2015"
		},
		{
			"business": "Recycled-Books",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_RecycledBooks_Christmas2016-min.jpg",
			"caption": "Recycled Booked -- Christmas 2016"
		},
		{
			"business": "Recycled-Book",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Recycled_Christmas-min.jpg",
			"caption": "Recycled Books -- Christmas"
		},
		{
			"business": "Royals",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Royals_Christmas-min.jpg",
			"caption": "Royals -- Christmas"
		},
		{
			"business": "Royals",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Royals_Pokemon-min.jpg",
			"caption": "Royals -- Pokemon"
		},
		{
			"business": "Royals",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_Royals_Winter-min.jpg",
			"caption": "Royals -- Winter"
		},
		{
			"business": "Seniors-In-Motions",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_SeniorsInMotionDod-min.jpg",
			"caption": "Seniors In Motion -- Day of the Dead"
		},
		{
			"business": "The-Venue",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_TheVenue_Renew-min.jpg",
			"caption": "The Venue -- Renew"
		},
		{
			"business": "Wine-Squared",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Window_WineSquared_Christmas-min.jpg",
			"caption": "Wine Squared -- Christmas"
		},
		{
			"business": "Divanti-Water",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_Divanti_Water-min.jpg",
			"caption": "Divanti Water"
		},
		{
			"business": "Eastside",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_Eastside_ChristmasCoal-min.jpg",
			"caption": "Eastside -- Christmas Coal"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_GDAC_36Denton-min.jpg",
			"caption": "GDAC -- 36"
		},
		{
			"business": "Denton-Arts-Council",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_GDAC_DoD2-min.jpg",
			"caption": "GDAC -- Day of the Dead"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_HarvestHouse_36Denton-min.jpg",
			"caption": "Harvest House -- 36"
		},
		{
			"business": "Harvest-House",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_HarvestHouse_KUDZU-min.jpg",
			"caption": "Harvest House -- KUDZU"
		},
		{
			"business": "Oak-Street",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_OakStreet_Christmas-min.jpg",
			"caption": "Oak Street -- Christmas"
		},
		{
			"business": "Texas-Tapas",
			"category": "windows",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Windows/Windows_TexasTapas_Christmas-min.jpg",
			"caption": "Texas Tapas -- Christmas"
		}
	];

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = [
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural01-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural02-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural03-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural04-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural05-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural06-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural07-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural08-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural09-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural10-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural11-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural12-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Mural13-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/PropaneTank-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Table01-min.jpg"
		},
		{
			"category": "residential",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Murals/Table02min.jpg"
		}
	];

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = [
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas1-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas2-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas3-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas4-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas5-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas6-min.jpg"
		},
		{
			"category": "canvas",
			"src": "http://ddtnccrpo7cm5.cloudfront.net/Images/Canvas/canvas7-min.jpg"
		}
	];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.contact = contact;

	var _axios = __webpack_require__(5);

	var _axios2 = _interopRequireDefault(_axios);

	var _notifications = __webpack_require__(4);

	var _notifications2 = _interopRequireDefault(_notifications);

	var _validator = __webpack_require__(31);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function contact() {
		var formWrapper = document.querySelectorAll('.form-wrapper');
		var formInputs = document.querySelectorAll('.form-input');
		var submitButton = document.querySelector('.contact-send');
		var name = document.getElementById('contact-name');
		var email = document.getElementById('contact-email');
		var phone = document.getElementById('contact-phone');
		var message = document.getElementById('contact-message');

		var successContent = document.getElementById('contact-success');
		var failureContent = document.getElementById('contact-failure');
		var errorContent = document.getElementById('contact-error');

		function submit() {
			if (submitButton.classList.contains('form-valid')) {
				submitButton.classList.add('form-loading');

				var data = {};
				data.name = name.value;
				data.email = email.value;
				data.phone = phone.value;
				data.message = message.value;

				_axios2.default.post('localhost:8000/contact', {
					name: data.name,
					email: data.email,
					phone: data.phone,
					message: data.message,

					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function (response) {
					if (response.data.success) {
						resetForm();
						submitButton.classList.remove('form-loading');
						submitButton.classList.add("form-success");

						var success = new Event('message-delivered');
						window.dispatchEvent(success);
						removeEvents();
					} else {
						submitButton.classList.remove('form-loading');
						submitButton.classList.add('form-failure');

						var failure = new Event('message-failed');
						window.dispatchEvent(failure);
					}
				});
			} else {
				var error = new Event('message-error');
				window.dispatchEvent(error);
			}
		}

		function resetForm() {
			Array.prototype.forEach.call(formInputs, function (input) {
				input.value = "";

				if (input.parentNode.classList.contains('valid')) {
					input.parentNode.classList.remove('valid');
				}

				if (input.parentNode.classList.contains('email-valid')) {
					input.parentNode.classList.remove('email-valid');
				}
			});
		}

		function removeEvents() {
			submitButton.removeEventListener('click', submit);
			(0, _validator.removeBlur)(formInputs);
		}

		var successNotify = new _notifications2.default({
			content: successContent,
			type: 'success',
			timeout: 2500
		});

		var failureNotify = new _notifications2.default({
			content: failureContent,
			type: 'danger',
			timeout: 2500
		});

		var errorNotify = new _notifications2.default({
			content: errorContent,
			type: 'warning',
			timeout: 2500
		});

		(0, _validator.onBlur)(formInputs);

		submitButton.addEventListener('click', submit);
		window.addEventListener('message-delivered', successNotify.open);
		window.addEventListener('message-failed', failureNotify.open);
		window.addEventListener('message-error', errorNotify.open);
	}

/***/ }
/******/ ]);
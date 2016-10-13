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

	var _landing = __webpack_require__(3);

	var _landing2 = _interopRequireDefault(_landing);

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

	navTrigger.addEventListener('click', openMobileMenu, false);
	(0, _landing2.default)();

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _scroll = __webpack_require__(4);

	var _scroll2 = _interopRequireDefault(_scroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function home() {
		var scrollEntrance = new _scroll2.default();
		var forwardButton = document.getElementById('forward-button');
		var formContainer = document.getElementById('landing-form-wrapper');
		var formInput = document.getElementById('landing-email');

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

		if (forwardButton) {
			forwardButton.addEventListener('click', lory.next);
		}
	}

	exports.default = home;

/***/ },
/* 4 */
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

/***/ }
/******/ ]);
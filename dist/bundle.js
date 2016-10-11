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
					_dom2.default.addClass(this.container, this.openClass);
					this._updateNav();
					this._addEvents();
				} else {
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

/***/ }
/******/ ]);
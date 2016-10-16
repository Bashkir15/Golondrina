import notifications from '../components/notifications'

function contact() {
	var formWrappers = document.querySelectorAll('.contact-form-wrapper');
	var formInputs = document.querySelectorAll('.contact-form-input');
	var submitButton = document.getElementById('contact-send');
	var successContent = document.getElementById('contact-success');
	var failureContent = document.getElementById('contact-failure');
	var errorContent = document.getElementById('contact-error');



	function onFocus() {
		Array.prototype.forEach.call(formInputs, (input) => {
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
		Array.prototype.forEach.call(formInputs, (input) => {
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
		var formValue = input.value
		var atpos = formValue.indexOf('@');
		var dotpos = formValue.lastIndexOf(".");

	
		if (atpos < 1 || (dotpos - atpos < 2)) {
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
		var phoneRe = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
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
		Array.prototype.forEach.call(formWrappers, (wrapper) => {
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

			var promise = new Promise((resolve, reject) => {
				var req = new XMLHttpRequest();

				req.open('POST', '/contact', true);
				req.onload = () => {
					if (req.status == 200) {
						resolve(req.response);
					} else {
						reject(Error(req.statusText));
					}
				};

				req.onError = () => {
					reject(Error('Error'));
				};

				req.send();
			});

			promise.then((response) => {
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

	var successNotify = new notifications({
		content: successContent,
		timeout: 2500,
		type: 'success'
	});

	var failureNotify = new notifications({
		content: failureContent,
		timeout: 2500,
		type: 'danger'
	});

	var errorNotfy = new notifications({
		content: errorContent,
		timeout: 2500,
		type: 'warning'
	});

	onFocus(); 
	onBlur();

	submitButton.addEventListener('click', sendMessage);
//	window.addEventListener('message-delivered', successNotify.open);
//	window.addEventListener('message-failed', failureNotify.open);
	window.addEventListener('sending-failed', errorNotfy.open);
}

export default contact
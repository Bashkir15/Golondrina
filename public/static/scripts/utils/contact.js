import axios from 'axios'
import notifications from '../components/notifications'

export function contact() {
	var formWrappers = document.querySelectorAll('.contact-form-wrapper');
	var formInputs = document.querySelectorAll('.contact-form-input');
	var submitButton = document.getElementById('contact-send');
	var successContent = document.getElementById('contact-success');
	var failureContent = document.getElementById('contact-failure');

	function onFocus() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.addEventListener('focus', inputFocus);
		});
	}

	function onBlur() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.addEventListener('blur', inputBlur);
		});
	}

	function inputFocus() {
		if (!this.parentNode.classList.contains('focused')) {
			this.parentNode.classList.add('focused');
		} else {
			return;
		}
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

		if (formContent !== '' && !this.parentNode.classList.contains('contact-form-email')) {
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

		if (atpos < 1 || (dotpos - atpos < 2)) {
			if (input.parentNode.classList.contains('blank')) {
				console.log('grrr');
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

	function checkValidForm() {
		var validForm = 0;

		Array.prototype.forEach.call(formWrappers, (wrapper) => {
			if (wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid')) {
				validForm++;
			}
		});

		if (validForm == 4) {
			submitButton.classList.add('contact-form-valid');
			submitButton.addEventListener('click', sendMessage);
		}
	}

	function sendMessage() {
		if (submitButton.classList.contains('contact-form-valid')) {
			submitButton.classList.add('contact-show-loading');

			var data = {};
			data.name = name.value;
			data.email = email.value;
			data.phone = phone.value;
			data.message = message.value;

			axios.post('http://localhost:7000/contact', {
				name: data.name,
				email: data.email,
				phone: data.phone,
				message: data.message,

				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				if (response.data.success) {
					submitButton.classList.remove('contact-show-loading');
					var success = new Event('message-delivered');
					window.dispatchEvent(success);
					removeEvents();
				} else {
					submitButton.classList.remove('contact-show-loading');
					var failure = new Event('message-failed');
					window.dispatchEvent(failure);
				}
			});
		}
	}

	function removeEvents() {
		submitButton.removeEventListener('click', sendMessage);

		Array.prototype.forEach.call(formInputs, (input) => {
			input.removeEventListener('focus', inputFocus);
		});

		Array.prototype.forEach.call(formInputs, (input) => {
			input.removeEventListener('blur', inputBlur);
		});
	}

	function handleClose() {
		contactDialog.close();
		successNotify.open();
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

	onBlur();
	onFocus();

	window.addEventListener('message-delivered', handleClose);
	window.addEventListener('message-failed', failureNotify.open);
}
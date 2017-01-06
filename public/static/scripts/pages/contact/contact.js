import axios from 'axios'
import notifications from '../../components/notifications'
import { onBlur, removeBlur } from '../../utils/validator'


export function contact() {
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

			axios.post('http://localhost:8000/contact', {
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
		Array.prototype.forEach.call(formInputs, (input) => {
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
		removeBlur(formInputs);
	}

	var successNotify = new notifications({
		content: successContent,
		type: 'success',
		timeout: 2500
	});

	var failureNotify = new notifications({
		content: failureContent,
		type: 'danger',
		timeout: 2500
	});

	var errorNotify = new notifications({
		content: errorContent,
		type: 'warning',
		timeout: 2500
	});

	onBlur(formInputs);

	submitButton.addEventListener('click', submit);
	window.addEventListener('message-delivered', successNotify.open);
	window.addEventListener('message-failed', failureNotify.open);
	window.addEventListener('message-error', errorNotify.open);
}
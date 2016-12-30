import axios from 'axios'
import notifications from '../../components/notifications'
import { onBlur, removeBlur } from '../../utils/validator'


export function contact() {
	var formWrapper = document.querySelectorAll('.contact-form-wrapper');
	var formInputs = document.querySelectorAll('.contact-form-input');
	var submitButton = document.getElementById('contact-send');
	var name = document.getElementById('contact-name');
	var email = document.getElementById('contact-email');
	var phone = document.getElementById('contact-phone');
	var message = document.getElementById('contact-message');

	var successContent = document.getElementById('contact-success');
	var failureContent = document.getElementById('contact-failure');
	var errorContent = document.getElementById('contact-error');

	function submit() {
		if (submitButton.classList.contains('contact-form-valid')) {
			submitButton.classList.add('contact-form-loading');

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
					submitButton.classList.remove('contact-form-loading');
					submitButton.classList.add("contact-form-success");

					var success = new Event('message-delivered');
					window.dispatchEvent(success);
					removeEvents();
				} else {
					submitButton.classList.remove('contact-form-loading');
					submitButton.classList.add('contact-form-failure');

					var failure = new Event('message-failed');
					window.dispatchEvent(failure);
				}
			});
		} else {
			var error = new Event('message-error');
			window.dispatchEvent(error);
		}
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
import axios from 'axios'
import notifications from '../../components/notifications'
import { onBlur, removeBlur } from '../../utils/validator'


export function contact() {
	const formWrapper = document.querySelectorAll('.form-wrapper');
	const formInputs = document.querySelectorAll('.form-input');
	const submitButton = document.querySelector('.contact-send');
	const name = document.getElementById('contact-name');
	const email = document.getElementById('contact-email');
	const phone = document.getElementById('contact-phone');
	const message = document.getElementById('contact-message');

	const successContent = document.getElementById('contact-success');
	const failureContent = document.getElementById('contact-failure');
	const errorContent = document.getElementById('contact-error');

	function submit() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('form-loading');

			let data = {};
			data.name = name.value;
			data.email = email.value;
			data.phone = phone.value;
			data.message = message.value;

			axios.post('http://golondrina.herokuapp.com/contact', {
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
			let error = new Event('message-error');
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

	const successNotify = new notifications({
		content: successContent,
		type: 'success',
		timeout: 2500
	});

	const failureNotify = new notifications({
		content: failureContent,
		type: 'danger',
		timeout: 2500
	});

	const errorNotify = new notifications({
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
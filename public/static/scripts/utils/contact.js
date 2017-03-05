import axios from 'axios'
import notifications from '../components/notifications'
import { onBlur, removeBlur} from './validator'

export function contact() {
	const formWrapper = document.querySelectorAll('.form-wrapper');
	const formInputs = document.querySelectorAll('.form-input');
	const submitButton = document.querySelector('.form-send');
	const name = document.getElementById('contact-name');
	const email = document.getElementById('contact-email');
	const phone = document.getElementById('contact-phone');
	const message = document.getElementById('contact-message');

	const successContent = document.getElementById('contact-success');
	const failureContent = document.getElementById('contact-failure');
	const errorContent = document.getElementById('contact-error');

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
		tyoe: 'warning',
		timeout: 2500
	});

	onBlur(formInputs);

	function submit() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('form-loading');

			axios.post('/contact', {
				name: name.value,
				email: email.value,
				phone: phone.value,
				message: message.value,

				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				if (response.data.success) {
					resetForm();

					submitButton.classList.remove('form-loading');
					submitButton.classList.add('form-success');

					const success = new Event('message-delivered');
					window.dispatchEvent(success);

				} else {
					submitButton.classList.remove('form-loading');
					submitButton.classList.add('form-failure');

					const failure = new Event('message-failed');
					window.dispatchEvent(failure);
				}
			});
		} else {
			const error = new Event('message-error');
			window.dispatchEvent(error);
		}
	}

	function resetForm() {
		let i;
		let len = formInputs.length;

		for (i = 0; i < len; i++) {
			let input = formInputs[i];

			input.value = "";

			if (input.parentNode.classList.contains('valid')) {
				input.parentNode.classList.remove('valid');
			}

			if (input.parentNode.classList.contains('email-valid')) {
				input.parentNode.classList.remove('email-valid');
			}
		}
	}

	submitButton.addEventListener('click', submit);
	window.addEventListener('message-delivered', successNotify.open);
	window.addEventListener('message-failed', failureNotify.open);
	window.addEventListener('message-error', errorNotify.open);
}
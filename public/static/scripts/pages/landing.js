import notifications from '../components/notifications'
import axios from 'axios'
import { onBlur, removeBlur } from '../utils/validator'

export function landing() {
	let input = document.querySelectorAll('.form-input');
	let formWrapper = document.getElementById('landing-form-wrapper');
	let email = document.getElementById('landing-email');
	let signupButton = document.getElementById('signup-button');

	let successContent = document.getElementById('newsletter-success');
	let failureContent = document.getElementById('newsletter-failure');
	let errorContent = document.getElementById('newsletter-error');



	function newsletter() {
		console.log('meh');
		if (formWrapper.classList.contains('email-valid')) {
			signupButton.classList.add('form-loading');
		

			let data = {};
			data.email = email.value;

			axios.post('http://golondrina.herokuapp.com/contact/newsletter', {
				email: data.email,

				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => {
				if (response.data.success) {
					resetForm();
					signupButton.classList.remove('form-loading');
					signupButton.classList.add('form-success');

					var success = new Event('newsletter-success');
					window.dispatchEvent(success);

					setTimeout(() => {
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

	onBlur(input);

	var newsletterSuccess = new notifications({
		content: successContent,
		type: 'success',
		timeout: 2500
	});

	var newsletterFailure = new notifications({
		content: failureContent,
		type: 'danger',
		timeout: 2500
	});

	var newsletterError = new notifications({
		content: errorContent,
		type: 'warning',
		timeout: 2500
	});
	
	window.addEventListener('newsletter-success', newsletterSuccess.open, false);
	window.addEventListener('newsletter-failure', newsletterFailure.open, false);
	window.addEventListener('newsletter-error', newsletterError.open, false);
	signupButton.addEventListener('click', newsletter, false);
}
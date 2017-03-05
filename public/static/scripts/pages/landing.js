import notifications from '../components/notifications'
import axios from 'axios'
import { onBlur, removeBlur } from '../utils/validator'

export function landing() {
	const carouselElement = document.querySelector('.landing-carousel');
	const input = document.querySelectorAll('.form-input');
	const formWrapper = document.getElementById('landing-form-wrapper');
	const email = document.getElementById('landing-email');
	const signupButton = document.getElementById('signup-button');

	const successContent = document.getElementById('newsletter-success');
	const failureContent = document.getElementById('newsletter-failure');
	const errorContent = document.getElementById('newsletter-error');

	const flick = new Flickity(carouselElement, {
		autoPlay: 3500,
		pauseAutoPlayOnHover: false,
		draggable: false,
		wrapAround: true,
		cellSelector: '.landing-cell'
	});



	/* function newsletter() {
		console.log('meh');
		if (formWrapper.classList.contains('email-valid')) {
			signupButton.classList.add('form-loading');
		

			let data = {};
			data.email = email.value;

			axios.post('localhost:8000/contact/newsletter', {
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

	onBlur(input); */

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
	//signupButton.addEventListener('click', newsletter, false);
}
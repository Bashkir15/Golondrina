import modal from '../components/dialog'
import notifications from '../components/notifications'
import axios from 'axios'
import { contact } from '../utils/contact'

export function landing() {
	let contactDialogTrigger = document.getElementById('landing-contact');
	let contactContent = document.getElementById('contact-dialog');
	let formWrapper = document.getElementById('landing-form-wrapper');
	let email = doucument.getElementById('landing-email');
	let signupButton = document.getElementById('signup-button');

	let successContent = document.getElementById('newsletter-success');
	let failureContent = document.getElementById('newsletter-failure');
	let errorContent = document.getElementById('newsletter-error');

	let contactDialog = new modal({
		content: contactContent
	});

	function openContact() {
		contactDialog.open();
		contact();
	}

	function newsletter() {
		if (signupButton.classList.contains('signup-button-valid')) {
			signupButton.classList.add('signup-button-loading');
		}

		let data = {};
		data.email = email.value;

		axios.post('http://localhost:8000/contact/newsletter', {
			email: data.email,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			if (response.data.success) {
				resetForm();
				signupButton.classList.remove('signup-button-loading');
				signupButton.classList.add('signup-button-success');

				var success = new Event('newsletter-success');
				window.dispatchEvent(success);
			} else {
				signupButton.classList.remove('signup-button-loading');

				var failure = new Event('newsletter-failure');
				window.dispatchEvent(failure);
			}
		});
	} else {
		var error = new Event('newsletter-error');
		window.dispatchEvent(error);
	}

	function resetForm() {
		email.value = "";
	}

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
	
	contactDialogTrigger.addEventListener('click', openContact, false);
}
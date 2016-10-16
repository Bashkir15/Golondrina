import scrollIn from '../utils/scroll.in';

function home() {	
	var scrollEntrance = new scrollIn();
	var formContainer = document.getElementById('landing-form-wrapper');
	var formInput = document.getElementById('landing-email');
	var signupButton = document.getElementById('signup-button');


	function onFocus() {
		if (!formContainer.classList.contains('landing-email--valid')) {
			formContainer.classList.add('landing-email--focused');
		} else {
			return;
		}
	}

	function onBlur() {
		var formContent = formInput.value;
		var atpos = formContent.indexOf('@');
		var dotpos = formContent.lastIndexOf(".");

		if (formContainer.classList.contains('landing-email--focused')) {
			formContainer.classList.remove('landing-email--focused');
		}

		if (formContent == "") {
			formContainer.classList.add('landing-email--blank');
		} else if (atpos < 1 || (dotpos - atpos < 2)) {

			if (formContainer.classList.contains('landing-email--blank')) {
				formContainer.classList.remove('landing-email--blank');
			}

			formContainer.classList.add('landing-email--invalid');
		} else {

			if (!formContainer.classList.contains('landing-email--valid')) {

				if (formContainer.classList.contains('landing-email--blank')) {
					formContainer.classList.remove('landing-email--blank');
				} else if (formContainer.classList.contains('landing-email--invalid')) {
					formContainer.classList.remove('landing-email--invalid');
				}

				formContainer.classList.add('landing-email--valid');
			}

			return true;
		}

	}

	function signup() {
		if (formContainer.classList.contains('landing-email--valid')) {
			signupButton.classList.add('signup-button-loading');

			var emailData = document.getElementById('landing-email').value;
			var data = JSON.stringify({"email": emailData});

			var promise = new Promise((resolve, reject) => {
				var req = new XMLHttpRequest();

				req.open('POST', '/', true);
				req.setRequestHeader('Content-Type', 'application/json');
				req.onload = () => {
					if (req.status == 200) {
						resolve(req.response);
					} else {
						reject(Error(req.statusText));
					}
				};

				req.onError = () => {
					reject(Error("Error"));
				};

				req.send(data);
			});

			promise.then((response) => {
				if (response.success) {
					signupButton.classList.remove('signup-button-loading');
					var success = new Event('signed-up');
					window.dispatchEvent(success);
				} else {
					signupButton.classList.remove('signup-button-loading');
					var failure = new Event('signup-failed');
					window.dispatchEvent(failure);
				}
			}, (error) => {
				console.log('Signup error');
			});
		} else {
			var sendError = new Event('signup-error');
			window.dispatchEvent(sendError);
		}
	}
	
	document.addEventListener('DOMContentLoaded', () => {
		const slider = document.querySelector('.js_slider');

		lory(slider, {
			rewind: true,
			enableMouseEvents: true
		});
	});
	window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
	window.addEventListener('scroll', scrollEntrance.viewPortChange);
	window.addEventListener('resize', scrollEntrance.viewPortChange);
	formInput.addEventListener('focus', onFocus);
	formInput.addEventListener('blur', onBlur);
	signupButton.addEventListener('click', signup);

}

export default home

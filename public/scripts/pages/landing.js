import scrollIn from '../utils/scroll.in';

function home() {	
	var scrollEntrance = new scrollIn();
	var formContainer = document.getElementById('landing-form-wrapper');
	var formInput = document.getElementById('landing-email');


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

	window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
	window.addEventListener('scroll', scrollEntrance.viewPortChange);
	window.addEventListener('resize', scrollEntrance.viewPortChange);
	formInput.addEventListener('focus', onFocus);
	formInput.addEventListener('blur', onBlur);
}

export default home

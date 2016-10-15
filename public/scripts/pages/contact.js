function contact() {
	var formWrappers = document.querySelectorAll('.contact-form-wrapper');
	var formInputs = document.querySelectorAll('.contact-form-input');

/*	function onFocus() {
		var i = 0;
		for (i; i < formWrapper.length; i++) {
			formWrappers[i].addEventListener('focus', () => {
				for (k = 0; k < formInputs.length; k++) {

				}
			})
		}
	}

	function formFocus() {
		for (var k = 0; k < formWrappers.length; k++) {
			formWrappers[k].classList.add('contact--focused');
		}
	} */


	function onFocus() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.addEventListener('focus', inputFocus);
		});
	}

	function inputFocus() {
		if (!this.parentNode.classList.contains('focused')) {
			this.parentNode.classList.add('focused');
		} else {
			return;
		}
	}

	function onBlur() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.addEventListener('blur', inputBlur);
		});
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

		if (this.parentNode.classList.contains('contact-form-number')) {
			validatePhone();
		}

		if (formContent != '' && !this.parentNode.classList.contains('contact-form-email') && !this.parentNode.classList.contains('contact-form-number')) {
			if (this.parentNode.classList.contains('blank')) {
				this.parentNode.classList.remove('blank');
			}

			this.parentNode.classList.add('valid');
		}
	}

	function validateEmail() {
		var input = document.getElementById('contact-email');
		var formValue = input.value
		var atpos = formValue.indexOf('@');
		var dotpos = formValue.lastIndexOf(".");

		if (atpos < 1 || (dotpos - atpos < 2)) {
			if (input.parentNode.classList.contains('blank')) {
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

	function validatePhone() {
		var input = document.getElementById('contact-number');
		var formValue = input.value;
		var phoneRe = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
		if (!formValue.match(phoneRe) || formValue == '') {
			if (input.parentNode.classList.contains('blank')) {
				input.parentNode.classList.remove('blank');
			}

			if (input.parentNode.classList.contains('phone-valid')) {
				input.parentNode.classList.remove('phone-valid');
			}

			input.parentNode.classList.add('phone-invalid');
		} else if (formValue.match(phoneRe)) {
			if (input.parentNode.classList.contains('blank')) {
				input.parentNode.classList.remove('blank');
			}

			if (input.parentNode.classList.contains('phone-invalid')) {
				input.parentNode.classList.remove('phone-invalid');
			}

			input.parentNode.classList.add('phone-valid');
		} else {
			console.log('weird');
		}
	}

	onFocus(); 
	onBlur();
}

export default contact
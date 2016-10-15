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

	onFocus(); 
}

export default contact
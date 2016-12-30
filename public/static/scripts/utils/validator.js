
export function onBlur(nodes) {
	Array.prototype.forEach.call(nodes, (node) => {
		node.addEventListener('blur', inputBlur);
	});
}

export function removeBlur(nodes) {
	Array.prototype.forEach.call(nodes, (node) => {
		node.removeEventListener('blur', inputBlur);
	});
}

function validateEmail(node) {
	console.log('meep');
	var value = node.value;
	var atpos = value.indexOf('@');
	var dotpos = value.lastIndexOf('.');

	if (atpos < 1 || (dotpos - atpos) < 2) {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		node.parentNode.classList.add('email-invalid');
	} else {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		if (node.parentNode.classList.contains('email-invalid')) {
			node.parentNode.classList.remove('email-invalid');
		}

		node.parentNode.classList.add('email-valid');
	}
}

function inputBlur() {
	console.log('grr');
	var formContent = this.value;

	if (formContent == '') {
		this.parentNode.classList.add('blank');
	}

	if (this.parentNode.classList.contains('contact-form-email')) {
		validateEmail(this);
	}

	if (formContent != '' && !this.parentNode.classList.contains('contact-form-email')) {
		if (this.parentNode.classList.contains('blank')) {
			this.parentNode.classList.remove('blank');
		}

		this.parentNode.classList.add('valid');
	}

	checkValidForm();
}

function checkValidForm() {
	var formWrappers = document.querySelectorAll('.contact-form-wrapper');
	var submitButton = document.getElementById('contact-send');
	var valid = 0;

	Array.prototype.forEach.call(formWrappers, (wrapper) => {
		if( wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid')) {
			valid++;
		}
	});

	if (valid == 4) {
		submitButton.classList.add('contact-form-valid');
	}
}


import axios from 'axios'

export function login() {
	let loginEmail = document.getElementById('login-email');
	let loginPassword = document.getElementById('login-password');
	let submitButton = document.getElementById('login-submit');

	function submit() {
		let data = {};

		data.email = loginEmail;
		data.password = loginPassword;

		axios.post('http://localhost:8000/users/authenticate', {
			email: data.email.value,
			password: data.password.value,

			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			if (response.data.success) {
				let admin = JSON.stringify(response.data.res.record);

				window.localStorage.setItem('admin', admin);
				window.localStorage.setItem('golondrina-token', response.data.res.token);
			}
		});
	}

	submitButton.addEventListener('click', submit);
}
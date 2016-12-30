import axios from 'axios'

export function signup() {
	var submitButton = document.getElementById('signup-submit');
	let email = document.getElementById('signup-email');
	let password = document.getElementById('signup-password');
	let name = document.getElementById('signup-name');
	let username = document.getElementById('signup-username');

	function submit() {
		let data = {};

		data.name = name;
		data.email = email;
		data.password = password;

		axios.post('http://localhost:8000/users', {
			name: data.name.value,
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
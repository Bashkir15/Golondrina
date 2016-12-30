export function admin() {

	function checkAdmin() {

		var admin = JSON.parse(window.localStorage.getItem('admin'));

		if (admin) {
			if (admin.roles.indexOf('admin') == -1) {
				window.location.href = '/';
			} else {
				return;
			}
		} else {
			window.location.href = '/';
		}
	}

	checkAdmin();
}
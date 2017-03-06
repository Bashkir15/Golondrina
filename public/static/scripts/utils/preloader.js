export function preloader() {
	const container = document.querySelector('.preloader-container');

	HTMLDocument.prototype.ready = () => {
		return new Promise((resolve, reject) => {
			if (document.readyState === 'complete') {
				resolve(document);
			} else {
				document.addEventListener('DOMContentLoaded', () => {
					resolve(document);
				});
			}
		});
	}

	document.ready().then(() => {
		setTimeout(() => {
			container.classList.add('loaded');

			setTimeout(() => {
				document.body.classList.add('loaded');
			}, 500);
		}, 1000);
	});
}
function recent() {
	baguetteBox.run('.gallery', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt
		},
		animation: 'fadeIn'
	});
}

export default recent
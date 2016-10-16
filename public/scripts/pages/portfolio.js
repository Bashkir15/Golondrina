function portfolio() {

	if (window.location.href.indexOf('canvas') != -1) {
		baguetteBox.run('.gallery', {
			captions: (element) => {
				return element.getElementsByTagName('img')[0].alt;
			},
			animation: 'fadeIn'
		});
	}
}

export default portfolio
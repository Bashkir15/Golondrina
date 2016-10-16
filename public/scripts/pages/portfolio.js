function portfolio() {

	if (window.location.href.indexOf('canvas') != -1) {
		baguetteBox.run('.gallery', {
			captions: (element) => {
				return element.getElementsByTagName('img')[0].alt;
			},
			animation: 'fadeIn'
		});
	} else if (window.location.href.indexOf('commercial') != -1) {
		baguetteBox.run('.gallery2', {
			captions: (element) => {
				return element.getElementsByTagName('img')[0].alt;
			},
			animation: 'fadeIn'
		});
	} else if (window.location.href.indexOf('digital') != -1) {
		baguetteBox.run('.gallery3', {
			captions: (element) => {
				return element.getElementsByTagName('img')[0].alt;
			}
		});
	} else {
		baguetteBox.run('.gallery4', {
			captions: (element) => {
				return element.getElementsByTagName('img')[0].alt
			}
		});
	}
}

export default portfolio
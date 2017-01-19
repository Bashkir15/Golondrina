function buildGallery(images) {
	let i;
	let len;
	let image;

	var galleryIamges = [];

	for (i = 0, len = images.length; i < len - 1; i++) {
		image = images[i];

		galleryIamges.push({
			src: image.src,
			caption: image.caption
		});
	}

	return galleryIamges;
}

function loadMoreImages(galleryIamges, page) {
	page = page || 0;

	if (page == 0) {
		return galleryIamges.slice(0, 10);
	} else if (page == 1) {
		return galleryIamges.slice(10, 20);
	} else if (page == 2) {
		return galleryIamges.slice(20, 30);
	} else if (page == 3) {
		return galleryIamges.slice(30, 40);
	} else if (page == 4) {
		return galleryIamges.slice(40, 50);
	} else if (page == 5) {
		return galleryIamges.slice(50, 60);
	}
}

export {
	buildGallery
}

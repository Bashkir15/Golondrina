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

function loadMoreImages(newest, visible, container) {
	return new Promise((resolve) => {
		let i;
		let len = newest.length;

		let docFrag = document.createDocumentFragment();

		for (i = 0; i < len; i++) {
			let lightboxSrc = document.createElement('a');
			let image = document.createElement('img');
			lightboxSrc.setAttribute("href", newest[i].src);

			if (typeof newest[i].caption !== 'undefined') {
				image.setAttribute('alt', newest[i].caption);
			}

			docFrag.appendChild(lightboxSrc);
			lightboxSrc.appendChild(image);

			image.src = newest[i].src;
			visible.push(newest[i]);
		}

		container.appendChild(docFrag);

		resolve();			
	})
}

function buildImages(gallery, galleryVisible, galleryContainer, page) {
	var imageContainer = galleryContainer;
	if (page == 0) {
		loadMoreImages(gallery.splice(0, 10), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 1) {
		loadMoreImages(gallery.splice(10, 20), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 2) {
		loadMoreImages(gallery.splice(20, 30), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 3) {
		loadMoreImages(gallery.splice(30, 40), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 4) {
		loadMoreImages(gallery.splice(40, 50), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 5) {
		loadMoreImages(gallery.splice(50, 60), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	} else if (page == 6) {
		loadMoreImages(gallery.splice(60, 70), galleryVisible, imageContainer)
		.then(restartGallery(imageContainer));
	}

}

function restartGallery(container) {
	let gallery = container.className.split(" ")[0];

	baguetteBox.run(`.${gallery}`, {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});
}


export {
	buildGallery,
	loadMoreImages,
	buildImages,
	restartGallery
}

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

function loadMoreImages(newest, visible, hidden, container) {
	return new Promise((resolve) => {
		let i;
		let len;

		for (i = 0, len = newest.length - 1; i < len; i++) {
			let lightboxSrc = document.createElement('a');
			let image = document.createElement('img');
			lightboxSrc.setAttribute("href", newest[i].src);

			if (typeof newest[i].caption !== 'undefined') {
				image.setAttribute('alt', newest[i].caption);
			}

			lightboxSrc.appendChild(image);
			container.appendChild(lightboxSrc);

			if (lightboxSrc.getBoundingClientRect().top <= window.innerHeight + 100 && lightboxSrc.getBoundingClientRect().top > 0) {
				image.src = newest[i].src;
				visible.push(newest[i]);
			} else {
				hidden.push({image: newest[i], container: lightboxSrc});
			}

		}

		resolve();			
	})
}

function buildImages(gallery, galleryVisible, galleryHidden, galleryContainer, page) {
	var imageContainer = galleryContainer;
	if (page == 0) {
		loadMoreImages(gallery.splice(0, 10), galleryVisible, galleryHidden, imageContainer)
		.then(restartGallery(imageContainer, galleryHidden));
	} else if (page == 1) {
		loadMoreImages(gallery.splice(10, 20), galleryVisible, galleryHidden, imageContainer)
		.then(restartGallery(imageContainer));
	}

}

function restartGallery(container, galleryHidden) {
	let gallery = container.className.split(" ")[0];

	baguetteBox.run(`.${gallery}`, {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	window.addEventListener("scroll", () => {
		checkViewport(galleryHidden);
	}, false);
}

function checkViewport(hiddenImages) {
	hiddenImages.forEach((item) => {
		let rect = item.container.getBoundingClientRect();
		if (rect.top <= window.innerHeight + 100 && rect.top > 0) {
			item.container.firstChild.src = item.image.src;
		} else {
			return;
		}
	});
}

export {
	buildGallery,
	loadMoreImages,
	buildImages,
	restartGallery,
	checkViewport
}

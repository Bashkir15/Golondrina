import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import windows from '../../../../../dist/images/windows.json'

export function windowGallery() {
	const container = document.querySelector('.gallery');
	const gallery = buildGallery(windows);
	const galleryLength = gallery.length;
	const galleryVisible = [];
	const loadMoreButton = document.querySelector('.load-more-button');

	let page;

	loadMore();

	function loadMore() {
		page = page || 0;
		console.log(galleryLength);
		console.log(galleryVisible.length);

		if (galleryLength != galleryVisible.length) {
			buildImages(gallery, galleryVisible, container, page);
			page++;
		}

		if (galleryLength == galleryVisible.length) {
			loadMoreButton.classList.add('no-more-images');
			loadMoreButton.removeEventListener('click', loadMoreImages);
		}
 	}

 	loadMoreButton.addEventListener('click', loadMore, false);
}
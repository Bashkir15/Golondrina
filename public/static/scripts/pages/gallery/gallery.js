import { tabs } from '../../components/tabs'
import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import windows from '../../../../../dist/images/windows.json'
import residential from '../../../../../dist/images/residential.json'
import canvas from '../../../../../dist/images/canvas.json'


export function gallery() {
	const windowsContainer = document.querySelector('.gallery');
	const canvasContainer = document.querySelector('.gallery-2');
	const residentialContainer = document.querySelector('.gallery-3');
	const galleryLinks = document.querySelectorAll('.tab-link');

	const windowGallery = buildGallery(windows);
	const originalWindowLength = windowGallery.length;
	const loadWindowsButton = document.getElementById('load-more-windows');
	const windowsVisible = [];

	const residentialGallery = buildGallery(residential);
	const loadResidentialButton = document.getElementById('load-more-residential');
	const residentialVisible = [];

	const canvasGallery = buildGallery(canvas);
	const loadCanvasButton = document.getElementById('load-more-canvas');
	const canvasVisible = [];


	loadMoreWindows();
	tabs();


	Array.prototype.forEach.call(galleryLinks, (link) => {
		if (!link.classList.contains('gallery-loaded')) {

			let clickHandler = () => {
				setupGallery(link);

				setTimeout(() => {
					link.removeEventListener('click', clickHandler, false);
				}, 1000);
			};

			link.addEventListener('click', clickHandler, false);
		}
	});

	function setupGallery(item) {
		if (item.classList.contains('canvas-link')) {
			loadMoreCanvas();
		} else if (item.classList.contains('residential-link')) {
			loadMoreResidential();
		}
	}


	function loadMoreWindows() {
		var page = page || 0;
		if (windowGallery.length != windowsVisible.length) {
			buildImages(windowGallery, windowsVisible, windowsContainer, page);
			page++;
		}

		if (originalWindowLength == windowsVisible.length) {
			loadWindowsButton.classList.add('no-more-images');
			loadWindowsButton.removeEventListener('click', loadMoreWindows);
		}
	}

	function loadMoreResidential() {
		var page = page || 0;
		buildImages(residentialGallery, residentialVisible, residentialContainer, page);
		page++;
	}

	function loadMoreCanvas() {
		var page = page || 0;
		buildImages(canvasGallery, canvasVisible, canvasContainer, page);
		page++;
	}


	loadWindowsButton.addEventListener('click', loadMoreWindows, false);
	loadCanvasButton.addEventListener('click', loadMoreCanvas, false);
}
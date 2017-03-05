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
	const originalResidentialLength = residentialGallery.length;
	const loadResidentialButton = document.getElementById('load-more-residential');
	const residentialVisible = [];

	const canvasGallery = buildGallery(canvas);
	const originalCanvasLength = canvasGallery.length;
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

		if (residentialGallery.length != residentialVisible.length) {
			buildImages(residentialGallery, residentialVisible, residentialContainer, page);
			page++;
		}

		if (originalResidentialLength == residentialVisible.length) {
			loadResidentialButton.classList.add('no-more-images');
			loadResidentialButton.removeEventListener('click', loadMoreResidential);
		}
	}

	function loadMoreCanvas() {
		var page = page || 0;
		
		if (originalCanvasLength != canvasVisible.length) {
			buildImages(canvasGallery, canvasVisible, canvasContainer, page);
			page++;
		}

		if (originalCanvasLength == canvasVisible.length) {
			loadCanvasButton.classList.add('no-more-images');
			loadCanvasButton.removeEventListener('click', loadMoreCanvas);
		}
	}


	loadWindowsButton.addEventListener('click', loadMoreWindows, false);
	loadCanvasButton.addEventListener('click', loadMoreCanvas, false);
	loadResidentialButton.addEventListener('click', loadMoreResidential);
}
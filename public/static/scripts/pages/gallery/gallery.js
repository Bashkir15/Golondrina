import { tabs } from '../../components/tabs'
import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import windows from '../../../../../dist/images/windows.json'
import residential from '../../../../../dist/images/residential.json'
import canvas from '../../../../../dist/images/canvas.json'


export function gallery() {
	var windowsContainer = document.querySelector('.gallery');
	var canvasContainer = document.querySelector('.gallery-2');
	var residentialContainer = document.querySelector('.gallery-3');
	var galleryLinks = document.querySelectorAll('.tab-link');

	var windowGallery = buildGallery(windows);
	var loadWindowsButton = document.getElementById('load-more-windows');
	var windowsVisible = [];
	var windowsHidden = [];

	var residentialGallery = buildGallery(residential);
	var loadResidentialButton = document.getElementById('load-more-residential');
	var residentialVisible = [];
	var residentialHidden = [];

	var canvasGallery = buildGallery(canvas);
	var loadCanvasButton = document.getElementById('load-more-canvas');
	var canvasVisible = [];
	var canvasHidden = [];



	loadMoreWindows();


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
			buildImages(windowGallery, windowsVisible, windowsHidden, windowsContainer, page);
			page++;
		}

		if (windowGallery.length == windowsVisible.length) {
			loadWindowsButton.classList.add('no-more-images');
			loadWindowsButton.removeEventListener('click', loadMoreWindows);
		}
	}

	function loadMoreResidential() {
		var page = page || 0;
		buildImages(residentialGallery, residentialVisible, residentialHidden, residentialContainer, page);
		page++;
	}

	function loadMoreCanvas() {
		var page = page || 0;
		buildImages(canvasGallery, canvasVisible, canvasHidden, canvasContainer, page);
		page++;
	}

	tabs();


	loadWindowsButton.addEventListener('click', loadMoreWindows, false);
	loadCanvasButton.addEventListener('click', loadMoreCanvas, false);
}
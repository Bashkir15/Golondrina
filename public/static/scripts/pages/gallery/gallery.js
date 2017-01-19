import { tabs } from '../../components/tabs'
import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import windows from '../../../../../dist/images/windows.json'
import residential from '../../../../../dist/images/residential.json'
import canvas from '../../../../../dist/images/canvas.json'


export function gallery() {
	var windowsContainer = document.querySelector('.gallery');
	var canvasContainer = document.querySelector('.gallery-2');
	var residentialContainer = document.querySelector('.gallery-3');
	var loadMoreButton = document.getElementById('load-more');
	var galleryLinks = document.querySelectorAll('.tab-link');

	var windowGallery = buildGallery(windows);
	var windowsVisible = [];
	var windowsHidden = [];

	var residentialGallery = buildGallery(residential);
	var residentialVisible = [];
	var residentialHidden = [];

	var canvasGallery = buildGallery(canvas);
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
		buildImages(windowGallery, windowsVisible, windowsHidden, windowsContainer, page);
		page++;
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


	loadMoreButton.addEventListener('click', loadMoreWindows, false);
}
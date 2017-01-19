import { tabs } from '../../components/tabs'
import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/windows.json'
import residential from '../../../../../dist/images/residential.json'


export function gallery() {
	var windowsContainer = document.querySelector('.gallery');
	var residentialContainer = document.querySelector('.gallery-3');
	var loadMoreButton = document.getElementById('load-more');
	var galleryLinks = document.querySelectorAll('.tab-link');

	var windowGallery = buildGallery(windows);
	var windowsVisible = [];
	var windowsHidden = [];

	var residentialGallery = buildGallery(residential);
	var residentialVisible = [];
	var residentialHidden = [];



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
			// loadMoreCanvas();
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

	tabs();


	loadMoreButton.addEventListener('click', loadMoreWindows, false);
}
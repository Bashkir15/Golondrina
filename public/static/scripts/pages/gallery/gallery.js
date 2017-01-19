import { tabs } from '../../components/tabs'
import { buildGallery, loadMoreImages, buildImages, restartGallery} from './images'
import lazy from '../../utils/lazy.load'
import windows from '../../../../../dist/images/windows.json'


export function gallery() {
	var windowsContainer = document.querySelector('.gallery');
	var loadMoreButton = document.getElementById('load-more');
	var galleryLinks = document.querySelectorAll('.tab-link');
	var images = [];
	var hiddenImages = [];
	var displayedImages = [];
	var windowGallery = buildGallery(windows);
	var windowsVisible = [];
	var windowsHidden = [];


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
		var galleryName = '';

		if (!item.classList.contains('gallery-loaded')) {
			if (item.classList.contains('window-link')) {
				galleryName = 'windows';
				loadGallery(item, galleryName);
			} else if (item.classList.contains('canvas-link')) {
				galleryName = 'canvas';
				loadGallery(item, galleryName)
			}
		}
	}

	function loadGallery(item, gallery) {
		buildImages(gallery);
		item.classList.add('gallery-loaded');
	}

	function loadMoreWindows() {
		var page = page || 0;

		buildImages(windowGallery, windowsVisible, windowsHidden, windowsContainer, page);

		page++;
	}

	tabs();

	baguetteBox.run('.gallery-2', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-3', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-4', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});

	baguetteBox.run('.gallery-5', {
		captions: (element) => {
			return element.getElementsByTagName('img')[0].alt;
		}
	});


	loadMoreButton.addEventListener('click', loadMoreWindows, false);
}
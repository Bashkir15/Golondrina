import scrollIn from '../utils/scroll.in'

function about() {
	var aboutScroll = new scrollIn();


	window.addEventListener('DOMContentLoaded', aboutScroll.init, false);
	window.addEventListener('scroll', aboutScroll.viewPortChange);
	window.addEventListener('resize', aboutScroll.viewPortChange);
}

export default about;
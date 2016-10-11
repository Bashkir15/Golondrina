var mod = {};

mod.addClass = function (element, newClass) {
	if (element.classList.contains(newClass)) {
		return;
	} else {
		element.classList.add(newClass);
	} 
}

mod.removeClass = function (element, oldClass) {
	if (!element.classList.contains(oldClass)) {
		return;
	} else {
		element.classList.remove(oldClass);
	}
}

mod.hasClass = function (element, currentClass) {
	if (element.classList.contains(currentClass)) {
		return true;
	} else {
		return false;
	}
}

export default mod
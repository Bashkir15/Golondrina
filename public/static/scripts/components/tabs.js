export function tabs() {
	var tabWidget = Array.prototype.slice.call(document.querySelectorAll('.js-tab')) || [];

	var tabClickEvent = function (tabLink, tabLinks, tabPanels, linkIndex, e) {
		tabLinks.forEach((link) => {
			link.setAttribute('tabindex', '-1');
			link.setAttribute('aria-selected', 'false');
			link.parentNode.removeAttribute('data-tab-active');
			link.removeAttribute('data-tab-active');
		});

		tabLink.setAttribute('tabindex', '0');
		tabLink.setAttribute('aria-selected', 'true');
		tabLink.parentNode.setAttribute('data-tab-active', '');
		tabLink.setAttribute('data-tab-active', '');

		tabPanels.forEach((panel, index) => {
			if (index != linkIndex) {
				panel.setAttribute('aria-hidden', 'true');
				panel.removeAttribute('data-tab-active');
			} else {
				panel.setAttribute('aria-hidden', 'false');
				panel.setAttribute('data-tab-active', '');
			}
		});
	};

	var keyBoardEvent = function (tabLink, tabLinks, tabPanels, tabItems, index, e) {
		var keyCode = e.key || e.which,
		currentTab = tabLinks[index],
		previousTab = tabLinks[index - 1],
		nextTab = tabLinks[index + 1],
		firstTab = tabLinks[0],
		lastTab = tabLinks[tabLinks.length - 1];

		switch (keyCode) {
			case 'ArrowLeft':
			case 37:
				e.preventDefault();

				if (!previousTab) {
					lastTab.focus();
				} else {
					previousTab.focus();
				}
			break;

			case 'ArrowRight':
			case 39:
				e.preventDefault();

				if (!nextTab) {
					firstTab.focus();
				} else {
					nextTab.focus();
				}
			break;
		}
	};

	tabWidget.forEach((tabWidgetInstance, i) => {
		var tabList = tabWidgetInstance.getElementsByTagName('ul')[0],
		tabItems = Array.prototype.slice.call(tabList.getElementsByTagName('li')),
		tabLinks = [],
		tabPanels = Array.prototype.slice.call(tabWidgetInstance.getElementsByTagName('section'));

		tabList.setAttribute('role', 'tablist');

		tabItems.forEach((item, index) => {
			var link = item.getElementsByTagName('a')[0];

			tabLinks.push(link);

			item.setAttribute('role', 'presentation');

			if (index == 0) {
				item.setAttribute('data-tab-active', '');
			}
		});

		tabLinks.forEach((link, i) => {
			var anchor = link.getAttribute('href').split("#")[1];
			var attributes = {
				'id': 'tab-link' + i,
				'role': 'tab',
				'tabIndex': '-1',
				'aria-selected': 'false',
				'aria-controls': anchor
			};

			if (i == 0) {
				attributes['aria-selected'] = 'true';
				attributes.tabIndex = '0';

				link.setAttribute('data-tab-active', '');
			}

			for (var key in attributes) {
				link.setAttribute(key, attributes[key]);
			}

			link.addEventListener('click', (e) => {
				e.preventDefault();
			});

			link.addEventListener('focus', function(e) {
				tabClickEvent(this, tabLinks, tabPanels, i, e);
			});

			link.addEventListener('keydown', (e) => {
				keyBoardEvent(link, tabLinks, tabPanels, tabItems, i, e);
			});
		});

		tabPanels.forEach((panel, i) => {
			var nextTabLink = document.createElement('a'),
			nextTabLinkIndex = (i < tabPanels.length - 1) ? i+1 : 0;

			var attributes = {
				'role': 'tabpanel',
				'aria-hidden': 'true',
				'aria-labelledyby': 'tab-link-' + i
			};

			nextTabLink.setAttribute('href', '#tab-link-' + nextTabLinkIndex);
			nextTabLink.textContext = 'Next Tab';
			panel.appendChild(nextTabLink);

			if (i == 0) {
				attributes['aria-hidden'] = 'false';
				panel.setAttribute('data-tab-active', '');
			}

			for (var key in attributes) {
				panel.setAttribute(key, attributes[key]);
			}
		});
	});
}
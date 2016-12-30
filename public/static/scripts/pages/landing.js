import modal from '../components/dialog'
import { contact } from '../utils/contact'

export function landing() {
	let contactDialogTrigger = document.getElementById('landing-contact');
	let contactContent = document.getElementById('contact-dialog');

	let contactDialog = new modal({
		content: contactContent
	});

	function openContact() {
		contactDialog.open();
		contact();
	}
	
	contactDialogTrigger.addEventListener('click', openContact, false);
}
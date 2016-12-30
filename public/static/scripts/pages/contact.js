import axios from 'axios'
import notifications from '../components/notifications'
import { onBlur } from '../utils/validator'

export function contact() {
	var formWrapper = document.querySelectorAll('contact-form-wrapper');
	var formInputs = document.querySelectorAll('contact-form-input');
	var submitButton = document.getElementById('contact-send');

	onBlur(formInputs);
}
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {

	constructor() { }

	capitalizeString(string) {
		return string.toUpperCase();
	}

	uncapitaliseString(string) {
		return string.toLowerCase();
	}
}

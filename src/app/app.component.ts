import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

@Component({
	selector: 'app',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(public platform: Platform) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
		});
	}
}

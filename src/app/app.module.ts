import { AppComponent } from './app.component';
import { ContestsPage } from '../pages/contests/contests';
import { ContestsService } from "../services/contests.service";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';

@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,
		ContestsPage
	],
	imports: [
		IonicModule.forRoot(AppComponent)
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ContestsService
	]
})
export class AppModule {
}

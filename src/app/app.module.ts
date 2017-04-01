import { AppComponent } from './app.component';
import { ContestsPage } from '../pages/contests/contests';
import { ContestsService } from '../services/contests.service';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PlayersPage } from '../pages/players/players';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent,
		ContestsPage,
		PlayersPage
	],
	imports: [
		IonicModule.forRoot(AppComponent),
		RouterModule.forRoot(ROUTES)
	],
	providers: [
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ContestsService
	]
})
export class AppModule {
}

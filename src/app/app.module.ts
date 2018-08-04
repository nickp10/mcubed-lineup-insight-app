import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { ContestsPage } from '../pages/contests/contests';
import { ContestsService } from '../services/contests.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PlayersPage } from '../pages/players/players';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
        BrowserModule,
        AppRoutes,
        FormsModule,
        HttpModule,
        IonicModule.forRoot()
    ],
    providers: [
        ContestsService,
        StatusBar,
        SplashScreen
    ]
})
export class AppModule {
}

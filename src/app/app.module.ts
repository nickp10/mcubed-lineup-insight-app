import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContestsPage } from "../pages/contests/contests";
import { ContestsService } from "../services/contests.service";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from "@ionic/angular";
import { MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from "@angular/material";
import { NgModule } from "@angular/core";
import { PlayersPage } from "../pages/players/players";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";

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
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        AppRoutes,
        FormsModule,
        HttpClientModule,
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

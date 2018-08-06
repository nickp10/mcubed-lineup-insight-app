import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContestsPage } from "../pages/contests/contests";
import { PlayersPage } from "../pages/players/players";

const routes: Routes = [
    {
        path: "",
        component: ContestsPage
    },
    {
        path: "players/:id",
        component: PlayersPage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes {}

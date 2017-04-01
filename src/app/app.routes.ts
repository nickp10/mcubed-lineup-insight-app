import { Routes } from '@angular/router';
import { ContestsPage } from '../pages/contests/contests';
import { PlayersPage } from '../pages/players/players';

export const ROUTES: Routes = [
	{
		path: '',
		component: ContestsPage
	},
	{
		path: 'players/:id',
		component: PlayersPage
	}
];

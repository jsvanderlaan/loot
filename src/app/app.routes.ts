import { Routes } from '@angular/router';
import { DeckComponent } from './components/deck.component';
import { Gold1418Component } from './components/gold_1418.component';
import { Gold1419Component } from './components/gold_1419.component';
import { LootComponent } from './components/loot.component';
import { PlayerComponent } from './components/player.component';

export const routes: Routes = [
    { path: 'player', component: PlayerComponent },
    { path: 'deck', component: DeckComponent },
    { path: 'loot', component: LootComponent },
    { path: 'gold_1418', component: Gold1418Component },
    { path: 'gold_1419', component: Gold1419Component },
    { path: '**', redirectTo: 'player' },
];

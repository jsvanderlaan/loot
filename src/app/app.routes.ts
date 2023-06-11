import { Routes } from "@angular/router";
import { DeckComponent } from "./components/deck.component";
import { LootComponent } from "./components/loot.component";
import { PlayerComponent } from "./components/player.component";

export const routes: Routes = [
  {
    path: "player",
    component: PlayerComponent,
  },
  {
    path: "deck",
    component: DeckComponent,
  },
  {
    path: "loot",
    component: LootComponent,
  },
  {
    path: "**",
    redirectTo: "player",
  },
];

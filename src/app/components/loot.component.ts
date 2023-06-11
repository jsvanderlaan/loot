import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { StateService } from "../state.service";
import { LootCard } from "../types";
import { Utils } from "../utils";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Loot</h1>
    <ng-container *ngFor="let player of players">
      <h2>{{ player }}</h2>
      <button [disabled]="deck.length === 0" (click)="loot(player)">
        Loot
      </button>
      <div *ngIf="lootCards(player) as lootCards">
        <div *ngFor="let loot of lootCards">
          {{ loot.amountOfLoot }}x {{ loot.type }}
        </div>
        <div *ngIf="lootCards.length === 0">No loot yet...</div>
      </div>
    </ng-container>
  `,
})
export class LootComponent {
  deck: LootCard[];
  readonly players: string[];
  playerLoot: Map<string, LootCard[]>;

  constructor(_state: StateService) {
    this.players = _state.players();
    this.deck = Utils.shuffle(_state.deck() ?? []);
    this.playerLoot = new Map([]);
  }

  lootCards(player: string): LootCard[] {
    return this.playerLoot.get(player) ?? [];
  }

  loot(player: string): void {
    if (this.deck.length <= 0) {
      return;
    }
    const loot = this.deck.shift() as LootCard;
    this.playerLoot.set(player, [...(this.playerLoot.get(player) ?? []), loot]);
  }
}

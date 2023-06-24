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
    <h1 class="text-3xl mb-4 text-center">Loot</h1>
    <div
      *ngFor="let player of players"
      class="mb-8 flex flex-col justify-center"
    >
      <div *ngIf="lootCards(player) as lootCards" class="mb-4">
        <div class="grid grid-cols-3 gap-4">
          <div *ngFor="let loot of lootCards">
            <div class="mx-2 my-1">
              <img src="assets/{{ loot.type }}.svg" class="w-full mb-2" />
              <div class="text-center font-semibold">
                {{ loot.amountOfLoot }}x
              </div>
              <div class="text-center text-xs font-semibold">
                {{ loot.type }}
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="lootCards.length === 0" class=" ml-1 italic font-thin">
          No loot yet...
        </div>
      </div>

      <button
        [disabled]="deck.length === 0"
        (click)="loot(player)"
        class="px-4 py-1 rounded-full shadow-sm bg-cyan-500 text-white h-full text-xl"
      >
        {{ player }}
      </button>
    </div>
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

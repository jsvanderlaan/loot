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
              <div class="text-center">{{ loot.amountOfLoot }}x</div>
              <div class="text-center text-xs">
                {{ loot.type }}
              </div>
            </div>
          </div>
        </div>
        <div *ngIf="lootCards.length === 0" class=" ml-1 italic font-thin">
          No loot yet...
        </div>
        <div
          *ngIf="deck.length === 0"
          class=" ml-1 italic font-thin text-red-400"
        >
          Loot deck is empty.
        </div>
      </div>

      <button
        [disabled]="deck.length === 0"
        (click)="loot(player)"
        class="px-4 py-1 rounded-full shadow-sm bg-cyan-500 text-white h-full text-xl disabled:opacity-30"
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

  constructor(private readonly _state: StateService) {
    this.players = _state.players();
    const savedLoot = _state.loot();
    this.deck = savedLoot?.deck ?? Utils.shuffle(_state.deck() ?? []);
    this.playerLoot =
      savedLoot !== null ? this._fromObject(savedLoot.playerLoot) : new Map([]);
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
    this._state.setLoot({
      deck: this.deck,
      playerLoot: this._toObject(this.playerLoot),
    });
  }

  private _toObject(map: Map<string, LootCard[]>): Record<string, LootCard[]> {
    return Object.fromEntries(map.entries());
  }
  private _fromObject(
    obj: Record<string, LootCard[]>
  ): Map<string, LootCard[]> {
    return new Map(Object.entries(obj));
  }
}

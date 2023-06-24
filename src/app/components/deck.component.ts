import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { LOOT_CARDS, LOOT_TYPES } from "../constants";
import { StateService } from "../state.service";
import { Loot } from "../types";
import { Utils } from "../utils";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1 class="text-3xl mb-4 text-center">Choose loot</h1>
    <ul class="grid grid-cols-3 gap-2 mb-4">
      <li *ngFor="let type of types" class="p-2 rounded">
        <div class="mx-2 my-1">
          <button
            class="disabled:opacity-20 w-full"
            [disabled]="amount(type) >= max(type)"
            (click)="add(type)"
          >
            <img src="assets/{{ type }}.svg" class="w-full" />
          </button>
        </div>
        <div class="flex flex-row">
          <div class="text-center font-semibold mr-4 grow">
            {{ amount(type) || "-" }}
          </div>
          <button
            [disabled]="amount(type) <= 0"
            (click)="sub(type)"
            class=" px-2  disabled:opacity-20 "
          >
            <img src="assets/trash.svg" class="w-4" />
          </button>
        </div>
      </li>
    </ul>
    <div>
      <button
        type="button"
        (click)="reset()"
        class="mr-4 px-4 py-1 rounded-full shadow-sm bg-slate-400 text-white"
      >
        Reset
      </button>
      <button
        type="button"
        (click)="done()"
        class="px-4 py-1 rounded-full shadow-sm bg-cyan-500 text-white"
      >
        Done
      </button>
    </div>
  `,
})
export class DeckComponent {
  private readonly _defaultAmounts = new Map(
    LOOT_TYPES.map((type) => [type, 0])
  );
  private _amounts: Map<Loot, number>;
  private _max: Map<Loot, number>;

  types = LOOT_TYPES;

  constructor(
    private readonly _state: StateService,
    private readonly _router: Router
  ) {
    const deck = _state.deck();
    this._amounts =
      deck === null
        ? this._defaultAmounts
        : new Map(
            LOOT_TYPES.map((type) => [
              type,
              deck.filter((card) => card.type === type).length,
            ])
          );

    this._max = new Map(
      LOOT_TYPES.map((type) => [
        type,
        LOOT_CARDS.filter((card) => card.type == type).length,
      ])
    );
  }

  add(type: Loot): void {
    this._amounts.set(type, (this._amounts.get(type) ?? 0) + 1);
  }

  sub(type: Loot): void {
    this._amounts.set(type, (this._amounts.get(type) ?? 0) - 1);
  }

  amount(type: Loot): number {
    return this._amounts.get(type) ?? 0;
  }

  max(type: Loot): number {
    return this._max.get(type) ?? 0;
  }

  reset(): void {
    this._amounts = this._defaultAmounts;
  }

  done(): void {
    const deck = [...this._amounts.entries()].flatMap(([type, amount]) =>
      Utils.pick(
        LOOT_CARDS.filter((card) => card.type === type),
        amount
      )
    );
    this._state.setDeck(deck);
    this._router.navigate(["loot"]);
  }
}

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
    <h1>Choose loot</h1>
    <div *ngFor="let type of types">
      <button [disabled]="amount(type) <= 0" (click)="sub(type)">-</button>
      {{ amount(type) }}x {{ type }}
      <button [disabled]="amount(type) >= max(type)" (click)="add(type)">
        +
      </button>
    </div>
    <button (click)="reset()">Reset</button>
    <button (click)="done()">Done</button>
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

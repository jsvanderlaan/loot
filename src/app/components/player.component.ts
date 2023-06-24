import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";
import { StateService } from "../state.service";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  template: `
    <h1 class="text-3xl mb-8 text-center">Choose players</h1>
    <form class="mb-4" (submit)="add()">
      <input
        type="text"
        [formControl]="playerControl"
        class="rounded px-4 py-1 mr-4"
      />
      <button
        type="submit"
        class="px-4 py-1 rounded-full shadow-sm bg-cyan-500 text-white"
      >
        Add
      </button>
    </form>
    <ol class="mb-4 list-decimal list-inside">
      <li *ngFor="let player of players" class="text-lg">{{ player }}</li>
    </ol>
    <div *ngIf="players.length === 0" class="mb-4 ml-1 italic font-thin">
      Nobody here...
    </div>
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
export class PlayerComponent {
  players: string[];
  playerControl = new FormControl("");

  constructor(
    private readonly _state: StateService,
    private readonly _router: Router
  ) {
    this.players = _state.players();
  }

  add(): void {
    const value = this.playerControl.value;
    if (!value || this.players.includes(value)) {
      return;
    }
    this.players = [...this.players, value];
    this.playerControl.setValue("");
  }

  reset(): void {
    this.players = [];
  }

  done(): void {
    if (this.players.length === 0) {
      return;
    }
    this._state.setPlayers(this.players);
    this._router.navigate(["deck"]);
  }
}

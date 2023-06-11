import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterOutlet } from "@angular/router";
import { StateService } from "../state.service";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  template: `
    <h1>Choose players</h1>
    <div>
      <button (click)="reset()">Reset</button>
      <button (click)="done()">Done</button>
    </div>
    <div *ngFor="let player of players">{{ player }}</div>
    <input type="text" [formControl]="playerControl" />
    <button (click)="add()">Add</button>
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
    this._state.setPlayers(this.players);
    this._router.navigate(["deck"]);
  }
}

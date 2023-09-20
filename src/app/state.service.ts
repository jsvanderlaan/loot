import { Injectable } from "@angular/core";
import { LocalStorageKey, LootCard, LootState } from "./types";

@Injectable({
  providedIn: "root",
})
export class StateService {
  players(): string[] {
    return this._getItem<string[]>("players") ?? [];
  }
  setPlayers(players: string[]): void {
    this._setItem("players", players);
    this._removeItem("deck");
    this._removeItem("loot");
  }
  deck(): LootCard[] | null {
    return this._getItem<LootCard[]>("deck");
  }
  setDeck(deck: LootCard[]): void {
    this._setItem("deck", deck);
    this._removeItem("loot");
  }
  loot(): LootState | null {
    return this._getItem<LootState>("loot");
  }
  setLoot(lootState: LootState | null): void {
    this._setItem("loot", lootState);
  }

  private _getItem<T>(key: LocalStorageKey): T | null {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item);
  }

  private _setItem<T>(key: LocalStorageKey, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  private _removeItem(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }
}

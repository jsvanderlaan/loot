export type Loot =
  | "gold"
  | "lumber"
  | "hide"
  | "metal"
  | "snowthistle"
  | "rockroot"
  | "axenut"
  | "flamefruit"
  | "arrowvine"
  | "corpsecap"
  | "random_item";

export interface LootCardTemplate extends LootCard {
  amountOfCards: number;
}

export interface LootCard {
  type: Loot;
  amountOfLoot: number;
}

export type LocalStorageKey = "players" | "deck";

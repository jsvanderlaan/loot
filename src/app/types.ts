export type Loot =
  | "gold_special"
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

export type LocalStorageKey = "players" | "deck" | "loot";

export interface LootState {
  deck: LootCard[];
  playerLoot: Record<string, LootCard[]>;
}

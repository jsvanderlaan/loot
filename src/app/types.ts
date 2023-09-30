export type Loot =
    | 'gold_1418'
    | 'gold_1419'
    | 'gold'
    | 'lumber'
    | 'metal'
    | 'hide'
    | 'snowthistle'
    | 'rockroot'
    | 'axenut'
    | 'flamefruit'
    | 'arrowvine'
    | 'corpsecap'
    | 'random_item';

export interface LootCardTemplate extends LootCard {
    amountOfCards: number;
}

export interface LootCard {
    type: Loot;
    amountOfLoot: number;
}

export type LocalStorageKey = 'players' | 'deck' | 'loot' | 'gold_1418' | 'gold_1419';

export interface LootState {
    deck: LootCard[];
    playerLoot: Record<string, LootCard[]>;
}

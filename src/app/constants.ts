import { Loot, LootCard, LootCardTemplate } from "./types";

export const LOOT_TYPES: Loot[] = [
  "gold_special",
  "gold",
  "lumber",
  "hide",
  "metal",
  "snowthistle",
  "rockroot",
  "axenut",
  "flamefruit",
  "arrowvine",
  "corpsecap",
  "random_item",
];

const LOOT_CARD_TEMPLATES: LootCardTemplate[] = [
  {
    type: "gold_special",
    amountOfLoot: 1,
    amountOfCards: 1,
  },
  {
    type: "gold",
    amountOfLoot: 1,
    amountOfCards: 12,
  },
  {
    type: "gold",
    amountOfLoot: 2,
    amountOfCards: 6,
  },
  {
    type: "gold",
    amountOfLoot: 3,
    amountOfCards: 2,
  },
  {
    type: "lumber",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "lumber",
    amountOfLoot: 2,
    amountOfCards: 6,
  },
  {
    type: "hide",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "hide",
    amountOfLoot: 2,
    amountOfCards: 6,
  },
  {
    type: "metal",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "metal",
    amountOfLoot: 2,
    amountOfCards: 5,
  },
  {
    type: "metal",
    amountOfLoot: 3,
    amountOfCards: 1,
  },
  {
    type: "snowthistle",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "rockroot",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "axenut",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "flamefruit",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "arrowvine",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "corpsecap",
    amountOfLoot: 1,
    amountOfCards: 2,
  },
  {
    type: "random_item",
    amountOfLoot: 1,
    amountOfCards: 1,
  },
];

export const LOOT_CARDS: LootCard[] = LOOT_CARD_TEMPLATES.flatMap(
  ({ type, amountOfCards, amountOfLoot }) =>
    [...Array(amountOfCards)].map(() => ({ type, amountOfLoot }))
);

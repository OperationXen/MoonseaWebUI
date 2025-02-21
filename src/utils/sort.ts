import type { Rarity } from "@/types/items";

export function raritySortComparitor(i1: Rarity, i2: Rarity): number {
  const sortOrder = [
    "unknown",
    "common",
    "uncommon",
    "rare",
    "veryrare",
    "legendary",
  ];

  return sortOrder.indexOf(i1) - sortOrder.indexOf(i2);
}

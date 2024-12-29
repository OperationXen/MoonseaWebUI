import type { Consumable, MagicItem } from "@/types/items";
import type { Rarity } from "@/types/items";

export function getRarityText(rarity: Rarity) {
  if (rarity === "legendary") return "Legendary";
  if (rarity === "veryrare") return "Very rare";
  if (rarity === "rare") return "Rare";
  if (rarity === "uncommon") return "Uncommon";
  return "Unknown";
}

export function getRarityColour(rarity: Rarity) {
  if (rarity === "legendary") return "#FF8C00";
  if (rarity === "veryrare") return "#4B0082";
  if (rarity === "rare") return "#0000FF";
  if (rarity === "uncommon") return "#006400";
  return "#A9A9A9";
}

export function getNumberEquipped(data?: (Consumable | MagicItem)[]) {
  if (!data) return 0;

  const equipped = data.filter((c) => c.equipped);
  return equipped.length;
}

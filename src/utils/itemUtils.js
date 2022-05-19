export function getRarityColour(rarity) {
  if (rarity === "legendary") return "#FF8C00";
  if (rarity === "veryrare") return "#663399";
  if (rarity === "rare") return "#0000FF";
  if (rarity === "uncommon") return "#006400";
  return "#A9A9A9";
}

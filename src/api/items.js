import api from "./base";

export function createMagicItem(characterUUID, itemData) {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/magicitem/", data);
}

import api from "./base";

export function createMagicItem(characterUUID, itemData) {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/magicitem/", data);
}

export function updateMagicItem(ID, data) {
  return api.patch(`/api/magicitem/${ID}/`, data);
}

export function deleteMagicItem(ID) {
  return api.delete(`/api/magicitem/${ID}/`);
}

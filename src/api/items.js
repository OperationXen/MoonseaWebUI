import api from "./base";

export function createMagicItem(characterUUID, itemData) {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/data/magicitem", data);
}

export function updateMagicItem(UUID, data) {
  return api.patch(`/api/data/magicitem/${UUID}/`, data);
}

export function deleteMagicItem(UUID) {
  return api.delete(`/api/data/magicitem/${UUID}/`);
}

export function getMagicItemDetails(UUID) {
  return api.get(`/api/data/magicitem/${UUID}/`);
}

export function getMagicItemHistory(UUID) {
  return api.get(`/api/data/magicitem/events/${UUID}/`);
}

export function getUserMagicItems() {
  return api.get(`/api/data/magicitem`);
}

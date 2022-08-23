import api from "./base";

export function createMagicItem(characterUUID, itemData) {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/magicitem/", data);
}

export function updateMagicItem(UUID, data) {
  return api.patch(`/api/magicitem/${UUID}/`, data);
}

export function deleteMagicItem(UUID) {
  return api.delete(`/api/magicitem/${UUID}/`);
}

export function getMagicItemDetails(UUID) {
  return api.get(`/api/magicitem/${UUID}/`);
}

export function getMagicItemHistory(UUID) {
  return api.get(`/api/magicitem_events/${UUID}/`);
}

export function getUserMagicItems() {
  return api.get(`/api/magicitem/`);
}

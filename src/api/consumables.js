import api from "./base";

export function createConsumable(characterUUID, itemData) {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/consumable/", data);
}

export function updateConsumable(UUID, data) {
  return api.patch(`/api/consumable/${UUID}/`, data);
}

export function deleteConsumable(UUID) {
  return api.delete(`/api/consumable/${UUID}/`);
}

export function getConsumableDetails(UUID) {
  return api.get(`/api/consumable/${UUID}/`);
}

export function getUserConsumables() {
  return api.get(`/api/consumable/`);
}

import api from "./base";

export function updateMagicItem(UUID, data) {
  return api.patch(`/api/data/magicitem/${UUID}/`, data);
}

export function deleteMagicItem(UUID) {
  return api.delete(`/api/data/magicitem/${UUID}/`);
}

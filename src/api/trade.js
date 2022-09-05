import api from "./base";

export function createTradeAdvert(itemUUID, description) {
  let data = { item_uuid: itemUUID, description: description };
  return api.post("/api/magicitem/advert/", data);
}
export function deleteTradeAdvert(advertUUID) {
  return api.delete(`/api/magicitem/advert/${advertUUID}/`);
}

export function getUserAdverts() {
  return api.get("/api/magicitem/advert?own=true");
}

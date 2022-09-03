import api from "./base";

export function createTradeAdvert(itemUUID, description) {
  let data = { item_uuid: itemUUID, description: description };
  return api.post("/api/magicitem/advert/", data);
}

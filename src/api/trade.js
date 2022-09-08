import api from "./base";

export function createTradeAdvert(itemUUID, description) {
  let data = { item_uuid: itemUUID, description: description };
  return api.post("/api/magicitem/advert/", data);
}
export function deleteTradeAdvert(advertUUID) {
  return api.delete(`/api/magicitem/advert/${advertUUID}/`);
}

export function getUserAdverts(rarity = null) {
  return api.get("/api/magicitem/advert", {
    params: { own: true, rarity: rarity },
  });
}

export function searchAdverts(search) {
  return api.get("/api/magicitem/advert", { params: { search: search } });
}

/*********************  Trade Offers   *********************/
export function createTradeOffer(advertUUID, itemUUID, description) {
  let data = {
    advert_uuid: advertUUID,
    item_uuid: itemUUID,
    description: description,
  };
  return api.post("/api/magicitem/offer/", data);
}

export function getTradeOffers(direction = null) {
  return api.get("/api/magicitem/offer/", { params: { direction: direction } });
}

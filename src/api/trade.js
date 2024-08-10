import api from "./base";

// Weird endpoint name is due to adblockers blocking "advert"
export function createTradeAdvert(itemUUID, description) {
  let data = { item_uuid: itemUUID, description: description };
  return api.post("/api/data/magicitem/faesuggestion/", data);
}
export function deleteTradeAdvert(advertUUID) {
  return api.delete(`/api/data/magicitem/faesuggestion/${advertUUID}/`);
}

export function getUserAdverts(rarity = null) {
  return api.get("/api/data/magicitem/faesuggestion", {
    params: { own: true, rarity: rarity },
  });
}

export function searchAdverts(search) {
  return api.get("/api/data/magicitem/faesuggestion", {
    params: { search: search },
  });
}

/*********************  Trade Offers   *********************/
export function createTradeOffer(advertUUID, itemUUID, description) {
  let data = {
    advert_uuid: advertUUID,
    item_uuid: itemUUID,
    description: description,
  };
  return api.post("/api/data/magicitem/faeproposal/", data);
}

export function getTradeOffers(direction = null) {
  return api.get("/api/data/magicitem/faeproposal/", {
    params: { direction: direction },
  });
}

export function deleteTradeOffer(offerUUID) {
  return api.delete(`/api/data/magicitem/faeproposal/${offerUUID}`);
}

/*********************  Trade Actions   *********************/

export function acceptTradeOffer(offerUUID) {
  return api.post(`/api/data/magicitem/faeproposal/accept/${offerUUID}/`);
}
export function rejectTradeOffer(offerUUID) {
  return api.post(`/api/data/magicitem/faeproposal/reject/${offerUUID}/`);
}

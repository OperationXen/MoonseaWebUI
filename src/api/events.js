import api from "./base";

// unpaginated fetch of all character events
export function getEventsForCharacter(ID) {
  return api.get(`/api/character_events/${ID}`);
}

// function expects an object - possibly should convert to typescript to prevent the inevitable
export function createDMReward(data) {
  return api.post("/api/dm_reward/", data);
}

export function deleteDMReward(uuid) {
  let url = `/api/dm_reward/${uuid}/`;

  return api.delete(url);
}

export function getDMEvents(dmUUID) {
  return api.get(`/api/dm_events/${dmUUID}`);
}

export function deleteDMGame(uuid) {
  let url = `/api/dm_game/${uuid}/`;

  return api.delete(url);
}

// create new game
export function createDMGame(
  datetime,
  module,
  name,
  gold,
  downtime,
  levels,
  hours,
  breakdown,
  location,
  notes
) {
  let url = "/api/dm_game/";
  let data = {
    datetime: datetime,
    module: module,
    name: name,
    gold: gold,
    downtime: downtime,
    levels: levels,
    hours: hours,
    hours_notes: breakdown,
    location: location,
    notes: notes,
  };

  return api.post(url, data);
}

// update existing game
export function updateDMGame(uuid, data) {
  let url = `/api/dm_game/${uuid}/`;

  return api.patch(url, data);
}

export function createPlayerGame(ID, gameData) {
  let data = { character_uuid: ID, ...gameData };

  return api.post(`/api/game/`, data);
}

export function removeCharacterGame(gameUUID, characterUUID) {
  return api.delete(`/api/game/${gameUUID}/`, {
    data: { character_uuid: characterUUID },
  });
}

// catching up events
export function createEventCatchingUp(characterUUID, details) {
  let data = { character_uuid: characterUUID, details: details };

  return api.post("/api/catchingup/", data);
}

export function deleteEventCatchingUp(uuid) {
  return api.delete(`/api/catchingup/${uuid}/`);
}

// mundane trade events
export function createEventMundaneTrade(characterUUID, gold, sold, purchased) {
  let data = {
    character_uuid: characterUUID,
    gold_change: gold,
    sold: sold,
    purchased: purchased,
  };
  return api.post("/api/mundanetrade/", data);
}

export function deleteEventMundaneTrade(uuid) {
  return api.delete(`/api/mundanetrade/${uuid}/`);
}

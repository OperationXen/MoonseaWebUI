import api from "./base";

// unpaginated fetch of all character events
export function getEventsForCharacter(ID) {
  return api.get(`/api/character_events/${ID}`);
}

// function expects an object - possibly should convert to typescript to prevent the inevitable
export function createDMReward(data) {
  return api.post("/api/dm_reward/", data);
}

export function getDMEvents(dmUUID) {
  return api.get(`/api/dm_events/${dmUUID}`);
}

export function deleteDMEvent(uuid) {
  let url = `/api/dm_game/${uuid}/`;

  return api.delete(url);
}

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

export function createPlayerGame(ID, gameData) {
  let data = { character_uuid: ID, ...gameData };

  return api.post(`/api/game/`, data);
}

export function removeCharacterGame(gameUUID, characterUUID) {
  return api.delete(`/api/game/${gameUUID}/`, {
    data: { character_uuid: characterUUID },
  });
}

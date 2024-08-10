import api from "./base";

// unpaginated fetch of all character events
export function getEventsForCharacter(ID) {
  return api.get(`/api/data/character_events/${ID}`);
}

// function expects an object - possibly should convert to typescript to prevent the inevitable
export function createDMReward(data) {
  return api.post("/api/data/dm_reward/", data);
}

export function deleteDMReward(uuid) {
  let url = `/api/data/dm_reward/${uuid}/`;

  return api.delete(url);
}

export function getDMEvents(dmUUID) {
  return api.get(`/api/data/dm_events/${dmUUID}`);
}

export function deleteDMGame(uuid) {
  let url = `/api/data/dm_game/${uuid}/`;

  return api.delete(url);
}

// create new game
export function createDMGame(datetime, module, name, gold, downtime, levels, hours, breakdown, location, notes) {
  let url = "/api/data/dm_game/";
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
  let url = `/api/data/dm_game/${uuid}/`;

  return api.patch(url, data);
}

export function createPlayerGame(ID, gameData) {
  let data = { character_uuid: ID, ...gameData };

  return api.post(`/api/data/game/`, data);
}

export function removeCharacterGame(gameUUID, characterUUID) {
  return api.delete(`/api/data/game/${gameUUID}/`, {
    data: { character_uuid: characterUUID },
  });
}

// catching up events
export function createEventCatchingUp(characterUUID, details) {
  let data = { character_uuid: characterUUID, details: details };

  return api.post("/api/data/catchingup/", data);
}

export function deleteEventCatchingUp(uuid) {
  return api.delete(`/api/data/catchingup/${uuid}/`);
}

// mundane trade events
export function createEventMundaneTrade(characterUUID, gold, sold, purchased) {
  let data = {
    character_uuid: characterUUID,
    gold_change: gold,
    sold: sold,
    purchased: purchased,
  };
  return api.post("/api/data/mundanetrade/", data);
}

export function deleteEventMundaneTrade(uuid) {
  return api.delete(`/api/data/mundanetrade/${uuid}/`);
}

// spellbook events
export function createEventSpellbookUpdate(characterUUID, gold, downtime, dm, sourceChar, spellsText) {
  let data = {
    character_uuid: characterUUID,
    gold: gold,
    downtime: downtime,
    dm: dm,
    source: sourceChar,
    spells: spellsText,
  };
  return api.post("/api/data/spellbook/", data);
}

export function deleteEventSpellbookUpdate(uuid) {
  return api.delete(`/api/data/spellbook/${uuid}/`);
}

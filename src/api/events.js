import api from "./base";

// function expects an object - possibly should convert to typescript to prevent the inevitable
export function createDMReward(data) {
  return api.post("/api/data/dm_reward", data);
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
  notes,
) {
  let url = "/api/data/dm_game";
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

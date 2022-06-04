import api from "./base";

export function getEventsForCharacter(ID, limit = 100, offset = 0) {
  const data = {
    character: ID,
    limit: limit,
    offset: offset,
  };

  return api.get("/api/events", { params: data });
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

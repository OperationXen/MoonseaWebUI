import api from "./base";

export function getEventsForCharacter(ID, limit = 100, offset = 0) {
  const data = {
    character: ID,
    limit: limit,
    offset: offset,
  };

  return api.get("/api/events", { params: data });
}

export function getDMEvents(dmUUID, limit = 100, offset = 0) {
  return api.get(`/api/dm_game/?dm=${dmUUID}`);
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

import api from "./base";

export function getEventsForCharacter(ID, limit = 100, offset = 0) {
  const data = {
    character: ID,
    limit: limit,
    offset: offset,
  };

  return api.get("/api/events", { params: data });
}

export function createDMReward(
  name,
  hours,
  gold,
  downtime,
  levels,
  item,
  charLevels,
  charItems
) {
  let data = {
    name: name,
    hours: hours,
    gold: gold,
    downtime: downtime,
    levels: levels,
    item: item,
    char_levels: charLevels,
    char_items: charItems,
  };
  return api.post("/api/dm_reward/", data);
}

export function getDMEvents(dmUUID, limit = 100, offset = 0) {
  return api.get(`/api/dm_game/?dm=${dmUUID}`);
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

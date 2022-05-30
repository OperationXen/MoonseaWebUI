import api from "./base";

export function getEventsForCharacter(ID, limit = 100, offset = 0) {
  const data = {
    character: ID,
    limit: limit,
    offset: offset,
  };

  return api.get('/api/events', { params: data });
}

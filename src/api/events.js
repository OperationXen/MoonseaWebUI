import axios from "axios";

export function getEventsForCharacter(ID, limit = 100, offset = 0) {
  const data = {
    character: ID,
    limit: limit,
    offset: offset,
  };

  return axios.get(`${process.env.PUBLIC_URL}/api/events`, { params: data });
}

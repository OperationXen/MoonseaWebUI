import api from "./base";

export function fetchAllCharacters() {
  return api.get('/api/character/');
}

export function getCharacterDetails(ID) {
  return api.get(`/api/character/${ID}`);
}

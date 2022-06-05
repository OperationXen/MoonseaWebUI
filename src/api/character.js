import api from "./base";

export function fetchAllCharacters() {
  return api.get("/api/character/");
}

export function getCharacterDetails(ID) {
  return api.get(`/api/character/${ID}`);
}

export function createCharacter(data) {
  return api.post("/api/character/", data);
}

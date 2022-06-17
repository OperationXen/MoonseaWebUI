import api from "./base";

export function fetchAllCharacters() {
  return api.get("/api/character/");
}

export function getCharacterDetails(ID) {
  return api.get(`/api/character/${ID}/`);
}

export function createCharacter(data) {
  return api.post("/api/character/", data);
}

export function updateCharacter(data) {
  return api.patch("/api/character/", data);
}

export function deleteCharacter(ID) {
  return api.delete(`/api/character/${ID}/`);
}

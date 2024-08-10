import api from "./base";

export function fetchAllCharacters() {
  return api.get("/api/data/character");
}

export function getCharacterDetails(ID) {
  return api.get(`/api/data/character/${ID}/`);
}

export function createCharacter(data) {
  return api.post("/api/data/character", data);
}

export function updateCharacter(ID, data) {
  return api.patch(`/api/data/character/${ID}/`, data);
}

export function deleteCharacter(ID) {
  return api.delete(`/api/data/character/${ID}/`);
}

export function uploadCharacterImage(ID, imageType, fileData) {
  return api.post(`/api/data/character/${ID}/${imageType}`, fileData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

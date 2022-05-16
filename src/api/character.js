import axios from "axios";

export function fetchAllCharacters() {
  return axios.get("/api/character/");
}

export function getCharacterDetails(ID) {
  return axios.get(`/api/character/${ID}`);
}

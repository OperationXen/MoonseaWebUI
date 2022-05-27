import axios from "axios";

export function fetchAllCharacters() {
  return axios.get(`${process.env.PUBLIC_URL}/api/character/`);
}

export function getCharacterDetails(ID) {
  return axios.get(`${process.env.PUBLIC_URL}/api/character/${ID}`);
}

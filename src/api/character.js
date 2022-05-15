import axios from "axios";

export function fetchAllCharacters() {
  return axios.get("/api/character/");
}

import api from "./base";

export function doCharacterImport(data: ArrayBuffer) {
  return api.put("/api/data/character-import/", data);
}

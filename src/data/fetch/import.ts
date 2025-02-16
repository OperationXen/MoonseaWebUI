import api from "./base";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function doCharacterImport(data: string) {
  return api.put("/api/data/character_import/", { importData: data }, config);
}

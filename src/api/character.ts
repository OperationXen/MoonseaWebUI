import api from "./base";

import type { CharacterImageType } from "@/types/character";
import type { UUID } from "@/types/uuid";

export function deleteCharacter(ID: any) {
  return api.delete(`/api/data/character/${ID}/`);
}

export function uploadCharacterImage(
  ID: UUID,
  imageType: CharacterImageType,
  fileData: any,
) {
  return api.post(`/api/data/character/${ID}/${imageType}`, fileData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

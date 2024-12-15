import api from "./base";

import type { Character } from "types/character";

export async function getCharacters() {
  return api
    .get("/api/data/character")
    .then((r) => r.data.results as Character[]);
}

export async function getCharacter(ID: string) {
  return api
    .get(`/api/data/character/${ID}`)
    .then((r) => r.data.result as Character);
}

export async function updateCharacter2(data: Character) {
  return api
    .patch(`/api/data/characeter/${data.uuid}/`, data)
    .then((r) => r.data.result as Character);
}

export function fetchAllCharacters() {
  return api.get("/api/data/character");
}

export function getCharacterDetails(ID: any) {
  return api.get(`/api/data/character/${ID}/`);
}

export function createCharacter(data: any) {
  return api.post("/api/data/character", data);
}

export function updateCharacter(ID: any, data: any) {
  return api.patch(`/api/data/character/${ID}/`, data);
}

export function deleteCharacter(ID: any) {
  return api.delete(`/api/data/character/${ID}/`);
}

export function uploadCharacterImage(ID: any, imageType: any, fileData: any) {
  return api.post(`/api/data/character/${ID}/${imageType}`, fileData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

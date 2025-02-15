import { getCharacterArchiveData } from "@/data/fetch/character";

import type { UUID } from "@/types/uuid";

function downloadData(rawData: any, filename: string) {
  const fileData = JSON.stringify(rawData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
}

function makeFilename(charName: string) {
  let name = charName.replace(/^\W$/gm, "");
  name = name.toLowerCase();

  return `msc-export-{name}.json`;
}

export function exportCharacter(uuid: UUID, name: string) {
  try {
    getCharacterArchiveData(uuid).then((rawData) => {
      downloadData(rawData, makeFilename(name));
      return true;
    });
  } catch (e) {
    return false;
  }
}

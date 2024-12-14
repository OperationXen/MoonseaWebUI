"use client";

import { Container, Box } from "@mui/material";

import type { Character } from "@/types/character";
import { characterQuery, characterMutation } from "@/data/fetch/character";

import CharacterBiographyPane from "@/components/characters/CharacterBiographyPane";
import CharacterDetailsPane from "@/components/characters/CharacterDetailsPane";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import CharacterEvents from "components/events/CharacterEvents";
import CharacterArt from "@/components/characters/CharacterArt";
import ItemPane from "components/items/ItemPane";

import type { UUID } from "@/types/uuid";

type PropsType = {
  params: { characterUUID: UUID };
};

export default function CharacterPage(props: PropsType) {
  const { characterUUID } = props.params;

  const { data: characterData, isPending } = characterQuery(characterUUID);
  const mutateCharacter = characterMutation();

  if (isPending) return <LoadingOverlay open={true} />;
  if (!characterData) return null;

  const handleCharacterUpdate = (changes: Partial<Character>) => {
    const newData = { ...characterData, ...changes };
    // TODO logically updating artwork or tokens should be a case of changing the URL
    // A different endpoint should be used for uploading new files
    newData.artwork = null;
    newData.token = null;
    return mutateCharacter.mutateAsync(newData);
  };

  return (
    <Container sx={{ marginTop: "4px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px grey",
          overflow: "hidden",
          marginBottom: "0.4em",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CharacterArt character={characterData} updateCharacter={handleCharacterUpdate} />
          <CharacterDetailsPane character={characterData} updateCharacter={handleCharacterUpdate} />
        </Box>
        <Box sx={{ display: "flex", width: "100%", paddingTop: "4px" }}>
          <CharacterBiographyPane character={characterData} onUpdate={handleCharacterUpdate} />
        </Box>
        <ItemPane data={characterData} />
      </Box>

      <Box sx={{ minHeight: "50em", marginBottom: "0.4em" }}>
        <CharacterEvents
          characterUUID={characterUUID}
          characterName={characterData?.name || ""}
          downtime={characterData?.downtime || 0}
          editable={characterData?.editable || false}
        />
      </Box>
    </Container>
  );
}

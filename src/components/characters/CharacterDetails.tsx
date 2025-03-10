import { Container, Box, Paper } from "@mui/material";

import { useCharacter } from "@/data/fetch/character";
import CharacterDetailsPane from "@/components/characters/CharacterDetailsPane";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import CharacterEventGrid from "@/components/events/CharacterEventGrid";
import CharacterArt from "@/components/characters/CharacterArt";
import ItemPane from "components/items/ItemPane";

import type { Character } from "@/types/character";
import type { UUID } from "@/types/uuid";

type PropsType = {
  characterUUID: UUID;
};

export function CharacterDetails(props: PropsType) {
  const { characterUUID } = props;

  const {
    data: characterData,
    isPending,
    updateCharacter,
    refreshCharacter,
  } = useCharacter(characterUUID);

  if (isPending) return <LoadingOverlay open={true} />;
  if (!characterData) return null;

  const handleCharacterUpdate = (changes: Partial<Character>) => {
    const newData = { ...characterData, ...changes };
    return updateCharacter(newData);
  };

  return (
    <Container className="mt-4">
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px grey",
          overflow: "hidden",
          marginBottom: "0.4em",
          minHeight: "calc(100vh - 5em)",
        }}
      >
        <Box className="flex">
          <CharacterArt
            character={characterData}
            refreshCharacter={refreshCharacter}
          />
          <CharacterDetailsPane
            character={characterData}
            updateCharacter={handleCharacterUpdate}
          />
        </Box>

        <ItemPane data={characterData} />
      </Paper>

      <Box sx={{ minHeight: "50em", marginBottom: "1em" }}>
        <CharacterEventGrid
          characterUUID={characterUUID}
          characterName={characterData?.name || ""}
          downtime={characterData?.downtime || 0}
          editable={characterData?.editable || false}
        />
      </Box>
    </Container>
  );
}

export default CharacterDetails;

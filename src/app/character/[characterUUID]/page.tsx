"use client";

import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

import type { Character } from "@/types/character";
import { characterQuery, characterMutation } from "@/data/fetch/character";
import useSnackbar from "@/datastore/snackbar";

import CharacterDeleteConfirmation from "@/components/characters/widgets/CharacterDeleteConfirmation";
import CharacterDetailsEditDialog from "components/characters/CharacterDetailsEditDialog";
import CharacterBiographyPane from "components/characters/CharacterBiographyPane";
import CharacterDetailsPane from "components/characters/CharacterDetailsPane";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import CharacterEvents from "components/events/CharacterEvents";
import ItemPane from "components/items/ItemPane";

export default function CharacterPage({ params }: { params: { characterUUID: string } }) {
  const { characterUUID } = params;

  const { data: characterData, isPending } = characterQuery(characterUUID);
  const mutateCharacter = characterMutation();

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  if (isPending) return <LoadingOverlay open={true} />;
  if (!characterData) return null;

  const handleCharacterUpdate = (changes: Partial<Character>) => {
    const newData = { ...characterData, ...changes };
    return mutateCharacter.mutateAsync(newData);
  };

  return (
    <Grid
      container
      sx={{
        padding: "0.4em",
      }}
    >
      <Grid
        xs={12}
        lg={6.97}
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
          <CharacterDetailsPane
            character={characterData}
            updateCharacter={handleCharacterUpdate}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
          />

          <CharacterDetailsEditDialog
            open={showEdit}
            onClose={() => {
              setShowEdit(false);
            }}
          />
          <CharacterDeleteConfirmation
            name={characterData?.name || ""}
            uuid={characterUUID}
            open={showDelete}
            onClose={() => setShowDelete(false)}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterBiographyPane character={characterData} onUpdate={handleCharacterUpdate} />
        </Box>
        <ItemPane data={characterData} />
      </Grid>
      <Grid xs={0.06} />

      <Grid xs={12} lg={4.97} sx={{ minHeight: "50em", marginBottom: "0.4em" }}>
        <CharacterEvents
          characterUUID={characterUUID}
          characterName={characterData?.name || ""}
          downtime={characterData?.downtime || 0}
          editable={characterData?.editable || false}
        />
      </Grid>
    </Grid>
  );
}

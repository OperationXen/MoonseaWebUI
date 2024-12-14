"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { getCharacters } from "api/character";

import CreateCharacterWindow from "components/characters/CreateCharacterWindow";
import CharacterSummaryCard from "components/characters/CharacterSummaryCard";
import NoCharactersOverlay from "@/components/characters/NoCharactersOverlay";
import LoadingOverlay from "components/general/LoadingOverlay";

export default function Dashboard() {
  const [createOpen, setCreateOpen] = useState(false);

  const { data: characters, isPending } = useQuery({
    queryKey: ["characters"],
    queryFn: () => getCharacters(),
  });

  if (isPending) return <LoadingOverlay open={true} />;

  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "0.8em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexGrow: 1,
          gap: "0.8em",
          paddingBottom: "1.4em",
        }}
      >
        {characters?.length === 0 && <NoCharactersOverlay onClick={() => setCreateOpen(true)} />}
        {characters?.map((character: any) => (
          <CharacterSummaryCard key={character.uuid} character={character} />
        ))}
      </Box>
      <Fab color="primary" onClick={() => setCreateOpen(true)} sx={{ position: "fixed", right: "2em", bottom: "2em" }}>
        <AddIcon />
      </Fab>
      <CreateCharacterWindow open={createOpen} onClose={() => setCreateOpen(false)} />
    </React.Fragment>
  );
}

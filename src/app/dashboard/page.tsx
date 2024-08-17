"use client"

import React, { useState, useLayoutEffect } from "react";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import usePlayerStore from "@/datastore/player";
import CreateCharacterWindow from "components/characters/CreateCharacterWindow";
import CharacterSummaryCard from "components/characters/CharacterSummaryCard";
import EmptyDashboardWidget from "components/dashboard/EmptyDashboardWidget";
import LoadingOverlay from "components/general/LoadingOverlay";

export default function Dashboard() {
  const [characters, refreshCharacterData, loading] = usePlayerStore((s) => [
    s.characters,
    s.requestRefresh,
    s.loading,
  ]);
  const [createOpen, setCreateOpen] = useState(false);

  useLayoutEffect(() => {
    refreshCharacterData();
  }, [refreshCharacterData]);

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
        {characters.map((character: any) => (
          <CharacterSummaryCard key={character.uuid} character={character} />
        ))}
      </Box>
      {characters.length === 0 && (
        <EmptyDashboardWidget onClick={() => setCreateOpen(true)} />
      )}
      <LoadingOverlay show={loading} />
      <Fab
        color="primary"
        onClick={() => setCreateOpen(true)}
        sx={{ position: "fixed", right: "2em", bottom: "2em" }}
      >
        <AddIcon />
      </Fab>
      <CreateCharacterWindow
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </React.Fragment>
  );
}

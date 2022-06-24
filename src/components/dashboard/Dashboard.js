import React, { useState, useLayoutEffect } from "react";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import usePlayerStore from "../../datastore/player";
import CreateCharacterWindow from "../characters/CreateCharacterWindow";
import CharacterSummaryCard from "../characters/CharacterSummaryCard";
import EmptyDashboardWidget from "./EmptyDashboardWidget";
import LoadingOverlay from "../general/LoadingOverlay";

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
          margin: "1em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {characters.map((character) => (
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
        sx={{ position: "absolute", right: "2em", bottom: "2em" }}
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

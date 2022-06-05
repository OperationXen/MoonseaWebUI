import React, { useState, useLayoutEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import userStore from "../../datastore/user";
import useCharacterStore from "../../datastore/character";
import { fetchAllCharacters } from "../../api/character";
import CreateCharacterWindow from "../characters/CreateCharacterWindow";
import CharacterSummaryCard from "../characters/CharacterSummaryCard";
import EmptyDashboardWidget from "./EmptyDashboardWidget";
import LoadingOverlay from "../general/LoadingOverlay";

export default function Dashboard() {
  const navigate = useNavigate();
  const authenticated = userStore((s) => s.authenticated);
  const [characters, setCharacters] = useCharacterStore((s) => [
    s.characters,
    s.setCharacters,
  ]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  const getCharacterData = useCallback(() => {
    fetchAllCharacters()
      .then((response) => {
        setCharacters(response.data.results);
      })
      .finally(() => setLoading(false));
  }, [setCharacters]);

  // On initial load
  useLayoutEffect(() => {
    if (!authenticated) navigate("/login");
    getCharacterData();
  }, [getCharacterData, navigate, authenticated]);

  return (
    <React.Fragment>
      <Box
        sx={{
          margin: "1em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
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

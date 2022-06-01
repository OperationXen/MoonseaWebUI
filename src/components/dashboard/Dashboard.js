import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import userStore from "../../datastore/user";
import useCharacterStore from "../../datastore/character";
import { fetchAllCharacters } from "../../api/character";
import CharacterSummaryCard from "../characters/CharacterSummaryCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const authenticated = userStore((s) => s.authenticated);
  const [characters, setCharacters] = useCharacterStore((s) => [
    s.characters,
    s.setCharacters,
  ]);

  const getCharacterData = useCallback(() => {
    fetchAllCharacters().then((response) => {
      setCharacters(response.data.results);
    });
  }, [setCharacters]);

  // On initial load
  useEffect(() => {
    if (!authenticated) navigate("/login");
    getCharacterData();
  }, [getCharacterData, navigate, authenticated]);

  return (
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
        <CharacterSummaryCard character={character} />
      ))}
    </Box>
  );
}

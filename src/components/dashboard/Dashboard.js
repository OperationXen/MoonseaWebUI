import { useEffect, useCallback } from "react";

import { Box } from "@mui/material";

import { fetchAllCharacters } from "../../api/character";
import useCharacterStore from "../../datastore/character";
import CharacterSummaryCard from "../characters/CharacterSummaryCard";

export default function Dashboard() {
  const [characters, setCharacters] = useCharacterStore((s) => [
    s.characters,
    s.setCharacters,
  ]);

  const getCharacterData = useCallback(() => {
    fetchAllCharacters().then((response) => {
      setCharacters(response.data.results);
    });
  }, [setCharacters]);

  useEffect(() => {
    getCharacterData();
  }, [getCharacterData]);

  return (
    <Box
      sx={{
        margin: "2em",
        display: "flex",
        flexDirection: "row wrap",
        justifyContent: "space-around",
      }}
    >
      {characters.map((character) => (
        <CharacterSummaryCard character={character} />
      ))}
    </Box>
  );
}

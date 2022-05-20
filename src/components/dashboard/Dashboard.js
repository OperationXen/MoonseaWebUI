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

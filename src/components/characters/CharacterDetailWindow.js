import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { getCharacterDetails } from "../../api/character";
import CharacterDetails from "./CharacterDetails";
import CharacterBiographyPane from "./CharacterBiographyPane";
import CharacterEvents from "../events/CharacterEvents";
import ItemSidebar from "../items/ItemSidebar";

export default function CharacterDetailWindow(props) {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getCharacterDetails(id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100% - 3.5em)",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0.32,
          border: "1px solid black",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <CharacterDetails characterData={data} />
        <CharacterBiographyPane />
      </Box>

      <Box sx={{ flexGrow: 0.4, flexShrink: 1 }}>
        <CharacterEvents characterID={data.id} />
      </Box>
      <Box sx={{ display: "flex", flexGrow: 0.25 }}>
        <ItemSidebar itemData={data} />
      </Box>
    </Box>
  );
}

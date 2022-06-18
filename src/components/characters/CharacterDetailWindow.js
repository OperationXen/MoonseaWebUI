import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { getCharacterDetails } from "../../api/character";
import CharacterBiographyPane from "./CharacterBiographyPane";
import CharacterEvents from "../events/CharacterEvents";
import CharacterControls from "./CharacterControls";
import CharacterDetailsPane from "./CharacterDetailsPane";
import DeleteConfirm from "./widgets/DeleteConfirm";
import ItemPane from "../items/ItemPane";

export default function CharacterDetailWindow(props) {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

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
          flexGrow: 0.38,
          border: "1px solid black",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px grey",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterDetailsPane characterData={data} />
          <CharacterControls onDeleteClicked={() => setShowDelete(true)} />
          <DeleteConfirm
            name={data.name}
            ID={data.id}
            open={showDelete}
            onClose={() => setShowDelete(false)}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterBiographyPane
            id={id}
            biography={data.biography}
            dmText={data.dm_text}
          />
        </Box>
        <ItemPane itemData={data.items} />
      </Box>

      <Box sx={{ flexGrow: 0.58 }}>
        <CharacterEvents characterID={data.id} />
      </Box>
    </Box>
  );
}

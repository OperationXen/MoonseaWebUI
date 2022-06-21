import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import { getCharacterDetails } from "../../api/character";
import CharacterBiographyPane from "./CharacterBiographyPane";
import CharacterEvents from "../events/CharacterEvents";
import CharacterControls from "./CharacterControls";
import CharacterDetailsPane from "./CharacterDetailsPane";
import DeleteConfirm from "./widgets/DeleteConfirm";
import ItemPane from "../items/ItemPane";

export default function CharacterDetailWindow(props) {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [data, setData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getCharacterDetails(uuid)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        displayMessage("Character not known", "error");
        navigate("/");
      });
  }, [uuid, navigate, displayMessage]);

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
            uuid={data.uuid}
            open={showDelete}
            onClose={() => setShowDelete(false)}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterBiographyPane
            uuid={uuid}
            biography={data.biography}
            dmText={data.dm_text}
          />
        </Box>
        <ItemPane itemData={data.items} />
      </Box>

      <Box sx={{ flexGrow: 0.58 }}>
        <CharacterEvents characteruuid={data.uuid} />
      </Box>
    </Box>
  );
}

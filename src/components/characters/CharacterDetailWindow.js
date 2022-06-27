import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";
import { getCharacterDetails } from "../../api/character";
import CharacterDetailsEditDialog from "./CharacterDetailsEditDialog";
import CharacterBiographyPane from "./CharacterBiographyPane";
import CharacterDetailsPane from "./CharacterDetailsPane";
import CharacterEvents from "../events/CharacterEvents";
import CharacterControls from "./CharacterControls";
import DeleteConfirm from "./widgets/DeleteConfirm";
import ItemPane from "../items/ItemPane";

export default function CharacterDetailWindow(props) {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const charData = useCharacterStore();
  const setCharData = useCharacterStore((s) => s.setAll);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    getCharacterDetails(uuid)
      .then((response) => {
        setCharData(response.data);
      })
      .catch((error) => {
        displayMessage("Character not known", "error");
        navigate("/");
      });
  }, [uuid, navigate, displayMessage, setCharData]);

  return (
    <Box
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100% - 4em)",
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
          <CharacterDetailsPane />
          <CharacterControls
            onEditClicked={() => setShowEdit(true)}
            onDeleteClicked={() => setShowDelete(true)}
          />
          <CharacterDetailsEditDialog
            open={showEdit}
            onClose={() => {
              setShowEdit(false);
            }}
          />
          <DeleteConfirm
            name={charData.name}
            uuid={uuid}
            open={showDelete}
            onClose={() => setShowDelete(false)}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterBiographyPane />
        </Box>
        <ItemPane itemData={charData.items} />
      </Box>

      <Box sx={{ flexGrow: 0.58 }}>
        <CharacterEvents characterUUID={uuid} characterName={charData.name} />
      </Box>
    </Box>
  );
}

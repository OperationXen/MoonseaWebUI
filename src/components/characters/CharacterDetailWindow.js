import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";

import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";
import { getCharacterDetails } from "../../api/character";
import CharacterControlsEditDialog from "./CharacterControlsEditDialog";
import CharacterBiographyPane from "./CharacterBiographyPane";
import CharacterDetailsPane from "./CharacterDetailsPane";
import CharacterEvents from "../events/CharacterEvents";
import CharacterControls from "./CharacterControls";
import ItemPane from "../items/ItemPane";

export default function CharacterDetailWindow(props) {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const charData = useCharacterStore();
  const [setCharData, refreshPending] = useCharacterStore((s) => [s.setAll, s.refresh]);
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
  }, [uuid, navigate, displayMessage, setCharData, refreshPending]);

  return (
    <Grid
      container
      sx={{
        padding: "0.4em",
      }}
    >
      <Grid
        xs={12}
        lg={6.97}
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px grey",
          overflow: "hidden",
          marginBottom: "0.4em",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CharacterDetailsPane />
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <CharacterBiographyPane />
        </Box>
        <ItemPane data={charData} />
      </Grid>
      <Grid xs={0.06} />

      <Grid xs={12} lg={4.97} sx={{ minHeight: "50em", marginBottom: "0.4em" }}>
        <CharacterEvents
          characterUUID={uuid}
          characterName={charData.name}
          downtime={charData.downtime}
          editable={charData.editable}
        />
      </Grid>
    </Grid>
  );
}

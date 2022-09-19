import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { TextField, Divider } from "@mui/material";

import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";
import { createEventCatchingUp } from "../../../api/events";

export default function CreateDTCatchup(props) {
  const { onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const characterUUID = useCharacterStore((s) => s.uuid);
  const requestCharacterRefresh = useCharacterStore((s) => s.requestRefresh);

  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    createEventCatchingUp(characterUUID, details)
      .then((response) => {
        displayMessage("Catching up added to log", "success");
        requestCharacterRefresh();
        onClose && onClose();
      })
      .catch((error) => displayMessage(error.response.data.message, "error"));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.4em" }}>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Event Details</Typography>
      </Divider>

      <TextField
        value={details}
        onChange={(e) => setDetails(e.target.value.substring(0, 256))}
        label="Details(optional)"
      />

      <Button
        variant="contained"
        sx={{ width: "60%", margin: "auto" }}
        onClick={handleSubmit}
      >
        Gain a level (10 downtime days)
      </Button>
    </Box>
  );
}

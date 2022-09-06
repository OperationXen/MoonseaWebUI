import React, { useEffect, useState } from "react";

import { Box, TextField, Tooltip } from "@mui/material";
import { Stack, Button, Popover } from "@mui/material";

import { GiSunkenEye } from "react-icons/gi";

import { updateCharacter } from "../../../api/character";
import useSnackbar from "../../../datastore/snackbar";

export default function VisionWidget(props) {
  const { uuid, vision, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [anchorEl, setAnchorEl] = useState(false);
  const [visionText, setVisionText] = useState("");

  useEffect(() => {
    setVisionText(vision);
  }, [vision, setVisionText]);

  const handleClick = (e) => {
    if (editable) setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdate = () => {
    updateCharacter(uuid, { vision: visionText })
      .then((response) => {
        displayMessage("Vision updated", "success");
      })
      .catch((error) => {
        displayMessage(error.response.message, "error");
        setVisionText(vision);
      })
      .finally(() => {
        handleClose();
      });
  };

  return (
    <React.Fragment>
      <Tooltip title={visionText}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={handleClick}
        >
          <GiSunkenEye size="1.6em" />
        </Box>
      </Tooltip>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose}
        sx={{
          transform: "translate(-8em, 0.2em)",
        }}
        PaperProps={{
          sx: {
            border: "1px solid black",
            padding: "1.2em",
            borderRadius: "8px",
            boxShadow: `0 0 4px inset black`,
          },
        }}
      >
        <Stack sx={{ alignItems: "center", gap: "0.4em" }}>
          <TextField
            sx={{ minWidth: "18em" }}
            label="Vision"
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
          />
          <Button
            sx={{ width: "80%" }}
            variant="contained"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Stack>
      </Popover>
    </React.Fragment>
  );
}

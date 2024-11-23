import React, { useState } from "react";

import { Box, TextField, Tooltip } from "@mui/material";
import { Stack, Button, Popover } from "@mui/material";

import { GiSunkenEye } from "react-icons/gi";

import type { Character } from "@/types/character";

type PropsType = {
  editable: boolean;
  vision: string;
  doUpdate: (x: Partial<Character>) => Promise<any>;
};

export default function VisionWidget(props: PropsType) {
  const { vision, editable, doUpdate } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [visionText, setVisionText] = useState(vision);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (editable) setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    // update the backend if the vision text has changed on close
    if (visionText !== vision) {
      doUpdate({ vision: visionText });
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title={visionText}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
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
        slotProps={{
          paper: {
            sx: {
              border: "1px solid black",
              padding: "1.2em",
              borderRadius: "8px",
              boxShadow: `0 0 4px inset black`,
            },
          },
        }}
      >
        <Stack sx={{ alignItems: "center", gap: "0.4em" }}>
          <TextField
            sx={{ minWidth: "18em" }}
            label="Vision"
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleClose();
            }}
          />
          <Button sx={{ width: "80%" }} variant="contained" onClick={handleClose}>
            Update
          </Button>
        </Stack>
      </Popover>
    </React.Fragment>
  );
}

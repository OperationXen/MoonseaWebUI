"use client";

import React, { useState } from "react";

import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";

import { Box, IconButton, Tooltip } from "@mui/material";

export function BiographyControl() {
  const [bioOpen, setBioOpen] = useState(false);
  const [dmNotesOpen, setDMNotesOpen] = useState(false);

  return (
    <React.Fragment>
      <Tooltip title="Character biography" placement="left">
        <IconButton onClick={() => setBioOpen(true)}>
          <AssignmentIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="DM notes" placement="left">
        <IconButton onClick={() => setDMNotesOpen(true)}>
          <DescriptionIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default BiographyControl;

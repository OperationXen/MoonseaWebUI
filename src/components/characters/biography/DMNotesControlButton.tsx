import React from "react";

import DescriptionIcon from "@mui/icons-material/Description";

import { IconButton, Tooltip } from "@mui/material";

type PropsType = {
  setOpen: () => void;
};

export function DMNotesControlButton(props: PropsType) {
  const { setOpen } = props;

  return (
    <Tooltip title="DM notes" placement="left" arrow>
      <IconButton onClick={setOpen}>
        <DescriptionIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DMNotesControlButton;

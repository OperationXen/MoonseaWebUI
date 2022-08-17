import React from "react";

import { Box, IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useSnackbar from "../../../datastore/snackbar";

export default function MagicItemControlPane(props) {
  //const { data } = props;
  const snackbar = useSnackbar((s) => s.displayMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    snackbar("Copied character link to clipboard");
  };
  const handleTrade = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        flex: "row wrap",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#AAAAAA70",
        borderRadius: "0px 0px 8px 8px",
      }}
    >
      <Tooltip title="Copy item link">
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit item">
        <IconButton disabled onClick={() => props.onEditClicked()}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Offer item for trade">
        <IconButton onClick={handleTrade}>
          <ShoppingCartIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete item">
        <IconButton
          disabled
          onClick={() => {
            props.onDeleteClicked();
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

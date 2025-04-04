import React, { useState } from "react";

import { Box, IconButton, Tooltip } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import useSnackbar from "@/data/store/snackbar";
import CreateAdvertDialog from "@/components/trade/CreateAdvertDialog";
import DeleteConfirm from "@/components/items/widgets/DeleteConfirm";

import type { MagicItem } from "@/types/items";

type PropsType = {
  editMode: boolean;
  setEditMode: (x: boolean) => void;

  item: MagicItem;
};

export default function MagicItemControlPane(props: PropsType) {
  const { uuid, equipped, name, editable } = props.item;
  const { editMode, setEditMode } = props;

  const snackbar = useSnackbar((s) => s.displayMessage);

  const [showDelete, setShowDelete] = useState(false);
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    snackbar("Copied character link to clipboard");
  };
  const handleEdit = () => {
    setEditMode(!editMode);
  };
  const handleDelete = () => {
    if (equipped) return;
    setShowDelete(true);
  };
  const handleTrade = () => {
    if (equipped) return;
    setShowAdvertCreate(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: "row wrap",
        alignItems: "center",
        width: "100%",
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
      {editable && (
        <React.Fragment>
          <Tooltip title={editMode ? "Save changes" : "Edit item"}>
            <IconButton onClick={handleEdit}>
              {(editMode && <SaveIcon fontSize="small" />) || (
                <EditIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              equipped ? "Cannot trade equipped items" : "Offer item for trade"
            }
          >
            <IconButton onClick={handleTrade}>
              <ShoppingCartIcon
                fontSize="small"
                sx={{ opacity: equipped ? 0.2 : 1 }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={equipped ? "Cannot delete equipped items" : "Delete item"}
          >
            <IconButton onClick={handleDelete}>
              <DeleteIcon
                fontSize="small"
                sx={{ opacity: equipped ? 0.2 : 1 }}
              />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}
      <DeleteConfirm
        name={name}
        uuid={uuid}
        open={showDelete}
        onClose={() => setShowDelete(false)}
      />
      <CreateAdvertDialog
        open={showAdvertCreate}
        onClose={() => setShowAdvertCreate(false)}
        onCreate={() => {}}
        item={props.item}
      />
    </Box>
  );
}

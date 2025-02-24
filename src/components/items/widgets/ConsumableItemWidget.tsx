import React, { useState } from "react";

import { Card, Typography, Tooltip, IconButton } from "@mui/material";

import { Delete } from "@mui/icons-material";

import useSnackbar from "@/data/store/snackbar";
import { getRarityColour } from "@/utils/items";

import type { Consumable } from "@/types/items";

type PropsType = {
  item: Consumable;
  updateItem: (newVal: Consumable) => Promise<any>;
  deleteItem: (item: Consumable) => Promise<any>;
};

export default function ConsumableItemWidget(props: PropsType) {
  const { item, updateItem, deleteItem } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [showControls, setShowControls] = useState(false);
  const colour = getRarityColour(item.rarity);

  const handleClick = () => {
    item.equipped = !item.equipped;
    updateItem(item).then(() => {
      displayMessage(
        item.equipped ? "Item unequipped" : "Item equipped",
        "info",
      );
    });
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteItem(item)
      .then(() => {
        displayMessage(`Deleted ${item.name}`, "success");
      })
      .catch(() => {
        displayMessage(`Unable to delete ${item.name}`, "error");
      });
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "3em",
        minWidth: "15em",
        padding: "0 8px",
        border: `2px solid ${colour}`,
        background: `${colour}${item.equipped ? 70 : 20}`,
        boxShadow: "2px 1px 6px #808080",
      }}
      onClick={handleClick}
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      <Typography fontWeight="550" sx={{ cursor: "pointer" }}>
        {item.name} {item.equipped ? "(Equipped)" : ""}
      </Typography>
      {showControls && (
        <Tooltip title="Remove consumable">
          <IconButton onClick={handleDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Card>
  );
}

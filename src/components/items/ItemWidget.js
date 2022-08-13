import React, { useState } from "react";
import { Card, Typography, Grid, Tooltip } from "@mui/material";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { updateMagicItem, deleteMagicItem } from "../../api/items";
import useSnackbar from "../../datastore/snackbar";
import useCharacterStore from "../../datastore/character";
import { getRarityColour } from "../../utils/itemUtils";

export default function ItemWidget(props) {
  const { uuid, name, attunement, rarity, equipped } = props.data;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const refreshData = useCharacterStore((s) => s.requestRefresh);

  const [showControls, setShowControls] = useState(false);
  const colour = getRarityColour(rarity);

  const handleClick = () => {
    updateMagicItem(uuid, { equipped: !equipped }).then(() => {
      displayMessage(equipped ? "Item unequipped" : "Item equipped", "info");
    });
    refreshData();
  };
  const handleDetailClick = (e) => {
    e.stopPropagation();
  };
  const handleTradeClick = (e) => {
    e.stopPropagation();
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
  };
  const handleDeleteClick = (e) => {
    deleteMagicItem(uuid)
      .then(() => {
        displayMessage(`Deleted ${name}`, "info");
        refreshData();
      })
      .catch((error) => displayMessage("Unable to delete", "error"));
    e.stopPropagation();
  };

  return (
    <Card
      sx={{
        height: "3em",
        margin: "0.2em",
        border: `2px solid ${colour}`,
        background: `${colour}${equipped ? 70 : 20}`,
        display: "flex",
        alignItems: "center",
        boxShadow: "2px 1px 4px #424242",
        width: "20em",
      }}
      onClick={handleClick}
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      <Grid container sx={{ position: "relative" }}>
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {attunement && (
            <Tooltip title="Item requires attunement">
              <BrightnessAutoIcon fontSize="small" sx={{ opacity: 0.8 }} />
            </Tooltip>
          )}
        </Grid>
        <Tooltip
          title={equipped ? "Click to unequip item" : "Click to equip"}
          placement="bottom"
        >
          <Grid
            item
            xs={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Typography fontWeight="550" sx={{ cursor: "pointer" }}>
              {name}
            </Typography>
          </Grid>
        </Tooltip>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {showControls && (
            <React.Fragment>
              <Tooltip
                title="(Not implemented yet) View item details and history"
                onClick={handleDetailClick}
              >
                <ArticleIcon fontSize="small" />
              </Tooltip>
              <Tooltip
                title={
                  equipped
                    ? "Cannot trade equipped items"
                    : "(Not implemented yet) Offer item for trade"
                }
                onClick={handleTradeClick}
              >
                <LocalGroceryStoreIcon
                  fontSize="small"
                  sx={{ opacity: equipped ? 0.2 : 0.8 }}
                />
              </Tooltip>
              <Tooltip title="Edit this item" onClick={handleEditClick}>
                <EditIcon fontSize="small" />
              </Tooltip>
              <Tooltip title="Delete item" onClick={handleDeleteClick}>
                <DeleteIcon fontSize="small" />
              </Tooltip>
            </React.Fragment>
          )}
        </Grid>
        {equipped && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              right: "0.2em",
              bottom: "-1.3em",
              opacity: 0.75,
            }}
          >
            Equipped
          </Typography>
        )}
      </Grid>
    </Card>
  );
}

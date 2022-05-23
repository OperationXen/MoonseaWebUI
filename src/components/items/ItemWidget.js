import React, { useState } from "react";
import { Card, Typography, Grid, Tooltip } from "@mui/material";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { getRarityColour } from "../../utils/itemUtils";

export default function ItemWidget(props) {
  const { id, name, rarity } = props.data;
  const [equipped, setEquipped] = useState(props.data.equipped);
  const [showControls, setShowControls] = useState(false);
  const colour = getRarityColour(rarity);

  const handleClick = () => {
    setEquipped(!!!equipped);
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
      }}
      onClick={handleClick}
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      <Grid container sx={{ position: "relative" }}>
        <Grid item xs={1} textAlign="center">
          <Tooltip title="Item requires attunement">
            <BrightnessAutoIcon
              fontSize="small"
              sx={{ opacity: equipped ? 0.8 : 0.2 }}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={8}>
          <Typography fontWeight="550">{name}</Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }}>
          {showControls && (
            <React.Fragment>
              <Tooltip
                title="View item details and history"
                onClick={handleDetailClick}
              >
                <ArticleIcon fontSize="small" />
              </Tooltip>
              <Tooltip
                title={
                  equipped
                    ? "Cannot trade equipped items"
                    : "Offer item for trade"
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Typography, Grid, Tooltip } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";

import { updateConsumable } from "../../../api/consumables";
import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";
import { getRarityColour } from "../../../utils/itemutils";

import type { Consumable } from "../../../types/items";

type PropsType = {
  item: Consumable;
};

export default function ConsumableItemWidget(props: PropsType) {
  const { item } = props;

  const navigate = useNavigate();
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [characterUUID, refreshData] = useCharacterStore((s) => [s.uuid, s.requestRefresh]);

  const [showControls, setShowControls] = useState(false);
  const colour = getRarityColour(item.rarity);

  const handleClick = () => {
    updateConsumable(characterUUID, { ...item, equipped: !item.equipped }).then(() => {
      displayMessage(item.equipped ? "Item unequipped" : "Item equipped", "info");
    });
    refreshData();
  };
  const handleDetailClick = (e: React.MouseEvent) => {
    e?.stopPropagation();
    navigate(`/consumable/${item.uuid}`);
  };

  return (
    <Card
      sx={{
        height: "3em",
        margin: "0.2em",
        border: `2px solid ${colour}`,
        background: `${colour}${item.equipped ? 70 : 20}`,
        display: "flex",
        alignItems: "center",
        boxShadow: "2px 1px 4px #424242",
        width: "20em",
      }}
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      <Grid container sx={{ position: "relative" }}>
        <Tooltip title={item.equipped ? "Click to unequip item" : "Click to equip"} placement="bottom">
          <Grid
            item
            xs={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={handleClick}
          >
            <Typography fontWeight="550" sx={{ cursor: "pointer" }}>
              {item.name}
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
            <Tooltip title="View item details and history">
              <ArticleIcon onClick={handleDetailClick} fontSize="small" />
            </Tooltip>
          )}
        </Grid>
        {item.equipped && (
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

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, Typography, Grid, Tooltip } from "@mui/material";

import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import ArticleIcon from "@mui/icons-material/Article";

import CreateAdvertDialog from "@/components/trade/CreateAdvertDialog";
import { updateMagicItem } from "@/api/items";
import useSnackbar from "@/datastore/snackbar";
import useCharacterStore from "@/datastore/character";
import { getRarityColour } from "@/utils/items";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem;
};

export default function ItemWidget(props: PropsType) {
  const { uuid, name, attunement, rarity, equipped } = props.item;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const refreshData = useCharacterStore((s) => s.requestRefresh);
  const router = useRouter();

  const [showControls, setShowControls] = useState(false);
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);
  const colour = getRarityColour(rarity);

  const handleClick = () => {
    updateMagicItem(uuid, { equipped: !equipped }).then(() => {
      displayMessage(equipped ? "Item unequipped" : "Item equipped", "info");
    });
    refreshData();
  };
  const handleDetailClick = (e: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/magicitem/${uuid}`);
  };
  const handleTradeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAdvertCreate(true);
  };
  const handleTradeDone = () => {
    setShowAdvertCreate(false);
    refreshData();
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
        <Tooltip title={equipped ? "Click to unequip item" : "Click to equip"} placement="bottom">
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
              <Tooltip title="View item details and history">
                <ArticleIcon onClick={handleDetailClick} fontSize="small" />
              </Tooltip>
              <Tooltip
                title={equipped ? "Cannot trade equipped items" : "Offer item for trade"}
                onClick={handleTradeClick}
              >
                <LocalGroceryStoreIcon fontSize="small" sx={{ opacity: equipped ? 0.2 : 0.8 }} />
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
      <CreateAdvertDialog open={showAdvertCreate} onClose={() => handleTradeDone()} item={props.item} />
    </Card>
  );
}

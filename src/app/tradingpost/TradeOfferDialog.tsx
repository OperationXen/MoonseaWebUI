import React, { useState } from "react";

import { Dialog, Divider, Typography, Box, Stack } from "@mui/material";
import { Select, MenuItem, Button, TextField } from "@mui/material";

import { getRarityText, getRarityColour } from "../../utils/items";
import { createTradeOffer } from "../../api/trade";

import { useTradingPostAdverts } from "@/data/fetch/tradingpost/items";
import useSnackbar from "@/data/store/snackbar";

import type { Advert } from "@/types/trade";
import type { MagicItem } from "@/types/items";

type PropsType = {
  open: boolean;
  onClose: () => void;
  item: MagicItem;
};

export default function TradeOfferDialog(props: PropsType) {
  const { open, onClose, item } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data: allItems, isLoading } = useTradingPostAdverts();

  const [itemSelected, setItemSelected] = useState("default");
  const [freeText, setFreeText] = useState("");

  const handleOffer = () => {
    createTradeOffer(item.uuid, itemSelected, freeText)
      .then((_response) => {
        displayMessage("Created offer", "info");
      })
      .catch((error) => {
        displayMessage(error.response.data.message, "error");
      })
      .finally(() => onClose());
  };

  // Tradable items can never include the item we're making the offer on
  const validItems = allItems?.filter((x: Advert) => {
    return x.uuid !== item.uuid && x.item.owner_uuid !== item.owner_uuid;
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            flexDirection: "column",
            padding: "1em 2em",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: "8px",
            border: "2px solid black",
            boxShadow: `2px 2px 60px black, 0px 0px 16px inset ${getRarityColour(item.rarity)}`,
            width: "42em",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Typography variant="h3">Propose New Trade</Typography>
      </Box>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Their Item</Divider>
      <Stack sx={{ alignItems: "center", gap: "0.4em" }}>
        <Typography variant="h5" sx={{ textDecoration: "underline" }}>
          {item.name}
        </Typography>
        <Typography sx={{ color: `${getRarityColour(item.rarity)}` }}>
          {getRarityText(item.rarity)}
        </Typography>
      </Stack>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Your Item</Divider>
      <Stack sx={{ width: "100%", gap: "0.8em", alignItems: "center" }}>
        <Select
          fullWidth
          disabled={!validItems?.length}
          value={itemSelected}
          onChange={(e) => setItemSelected(e.target.value)}
        >
          <MenuItem key="placeholder" value="default">
            {(isLoading && "Loading...") ||
              (validItems?.length && "Pick an item to offer as trade") ||
              "You have no valid items for trade"}
          </MenuItem>
          {validItems?.map((x: Advert) => {
            return (
              <MenuItem key={x.item.uuid} value={x.item.uuid}>
                {`${x.item.owner_name} - ${x.item.name}`}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          disabled={itemSelected === "default"}
          label={"Text to include with offer"}
          placeholder={"Optional text"}
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          multiline
          minRows={1}
          maxRows={3}
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ width: "60%" }}
          disabled={itemSelected === "default"}
          onClick={handleOffer}
        >
          Make offer
        </Button>
      </Stack>
    </Dialog>
  );
}

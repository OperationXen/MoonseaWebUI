import React, { useState } from "react";

import { Box, Stack, Divider, Dialog } from "@mui/material";
import { Typography, Button, TextField } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { getRarityColour, getRarityText } from "@/utils/items";
import { useTradingPostAdverts } from "@/data/fetch/tradingpost/items";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item?: MagicItem;
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
};

export function CreateAdvertDialog(props: PropsType) {
  const { item, open, onClose, onCreate } = props;

  const snackbar = useSnackbar((s) => s.displayMessage);
  const { createAdvert } = useTradingPostAdverts();

  const [advertText, setAdvertText] = useState("");

  const handleSubmit = () => {
    createAdvert({ itemUUID: item!.uuid, text: advertText })
      .then((_response) => {
        snackbar("Item moved to trading post", "info");
        onCreate();
        onClose();
      })
      .catch((error) => {
        snackbar(error.response.data.message, "error");
      });
  };

  if (!item) return null;

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
        <Typography variant="h3">Trade Item</Typography>
      </Box>
      <Typography variant="caption" sx={{ textAlign: "center" }}>
        Create an advert for the item and move it to the trading post. Whilst
        the item is in the trading post it will be unavailable for use by this
        character, but visible to other Moonsea Codex users who may propose a
        trade.
      </Typography>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Item Details</Divider>
      <Stack sx={{ alignItems: "center", gap: "0.4em" }}>
        <Typography variant="h5" sx={{ textDecoration: "underline" }}>
          {item.name}
        </Typography>
        <Typography sx={{ color: `${getRarityColour(item.rarity)}` }}>
          {getRarityText(item.rarity)}
        </Typography>
      </Stack>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Trade Advert</Divider>
      <Stack sx={{ width: "100%" }} spacing={"0.4em"}>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          To ensure a workable trade, use the advert text to indicate what items
          you would accept.
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Free text (Optional)"
          value={advertText}
          onChange={(e) => setAdvertText(e.target.value)}
          placeholder={"LF: Winged Boots, Broom of Flying or Portable Hole"}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Move to trading post
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

export default CreateAdvertDialog;

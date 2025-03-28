import React, { useState } from "react";

import { Box, Stack, Divider, Dialog } from "@mui/material";
import { Typography, Button, TextField } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { getRarityColour, getRarityText } from "@/utils/items";
import { createTradeAdvert } from "@/api/trade";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem | null;
  open: boolean;
  onClose: () => void;
};

export function CreateAdvertDialog(props: PropsType) {
  const { item, open, onClose } = props;

  const snackbar = useSnackbar((s) => s.displayMessage);

  const [advertText, setAdvertText] = useState("");

  const handleSubmit = () => {
    createTradeAdvert(item!.uuid, advertText)
      .then((_response) => {
        snackbar("Item moved to trading post", "info");
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
        This will create an advert for the item and move it to the trading post.
        Whilst the item is in the trading post it will be unavailable for use by
        this character, but other users can propose their items for exchange
        using AL rules. Item trades consume 5 downtime days and must be 1 for 1
        of the same rarity.
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
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Free text (Optional)"
          value={advertText}
          onChange={(e) => setAdvertText(e.target.value)}
          placeholder={
            "What items are you especially interested in seeing offered?\nIs there anything special about this item?"
          }
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

import React, { useState } from "react";

import { Dialog, Divider, Typography, Box, Stack } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { getRarityText, getRarityColour } from "../../utils/itemutils";

export default function TradeOfferDialog(props) {
  const { open, setOpen, name, rarity } = props;
  const items = props.items ?? [];

  const [itemSelected, setItemSelected] = useState("default");

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          padding: "1em 2em",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "8px",
          border: "2px solid black",
          boxShadow: `2px 2px 60px black, 0px 0px 16px inset ${getRarityColour(
            rarity
          )}`,
          width: "42em",
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
      <Stack>
        <Typography>Name: {name} / </Typography>
        <Typography sx={{ color: `${getRarityColour(rarity)}` }}>
          {getRarityText(rarity)}
        </Typography>
      </Stack>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Your Item</Divider>

      <Select
        fullWidth
        disabled={!items.length}
        value={itemSelected}
        onChange={(e) => setItemSelected(e.target.value)}
      >
        <MenuItem key="placeholder" value="default">
          You have no valid items for trade
        </MenuItem>
        {items.map((item) => {
          return <MenuItem key={item.uuid} value={item.uuid}></MenuItem>;
        })}
      </Select>
    </Dialog>
  );
}

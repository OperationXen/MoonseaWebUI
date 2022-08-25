import React, { useState } from "react";

import { Dialog, Divider, Typography, Stack } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { getRarityText } from "../../utils/itemutils";

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
          boxShadow: `0 0 8px inset black`,
          width: "42em",
        },
      }}
    >
      <Typography variant="h3">Propose New Trade</Typography>
      <Divider sx={{ width: "95%", margin: "0.4em" }}>Their Item</Divider>
      <Stack>
        <Typography>Name: {name}</Typography>
        <Typography>Rarity: {getRarityText(rarity)}</Typography>
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

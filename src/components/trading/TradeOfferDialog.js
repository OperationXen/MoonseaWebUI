import React, { useState, useEffect, useCallback } from "react";

import { Dialog, Divider, Typography, Box, Stack } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

import { getRarityText, getRarityColour } from "../../utils/itemutils";
import { getUserAdverts } from "../../api/trade";

export default function TradeOfferDialog(props) {
  const { open, onClose, name, rarity, uuid } = props;

  const [itemSelected, setItemSelected] = useState("default");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getValidTradeOptions = useCallback(() => {
    setLoading(true);
    getUserAdverts(rarity)
      .then((response) => {
        // Tradable items can never include the item we're making the offer on
        let validItems = response.data.filter((x) => x.uuid !== uuid);
        setItems(validItems);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rarity, uuid]);

  useEffect(() => {
    if (open) getValidTradeOptions();
  }, [getValidTradeOptions, open]);

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
      <Stack sx={{ alignItems: "center" }}>
        <Typography variant="h5" sx={{ textDecoration: "underline" }}>
          {name}
        </Typography>
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
          {(loading && "Loading...") ||
            (items.length && "Pick an item to offer as trade") ||
            "You have no valid items for trade"}
        </MenuItem>
        {items.map((x) => {
          return (
            <MenuItem key={x.item.uuid} value={x.uuid}>
              {x.item.name}
            </MenuItem>
          );
        })}
      </Select>
    </Dialog>
  );
}

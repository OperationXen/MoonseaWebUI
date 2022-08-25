import React, { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import TradeItemOwned from "./TradeItemOwned";

export default function TradingPostItems(props) {
  const [items] = useState([
    {
      name: "Wand of Chickens",
      rarity: "legendary",
      owner: "Keshet",
      details: "Will trade for Vecna's hand",
    },
    {
      name: "Bloodstone Vial",
      rarity: "uncommon",
      owner: "Mez'aki",
      details: "Will only trade for magic rocks",
    },
    {
      name: "Cloak of Displacement",
      rarity: "rare",
      owner: "Mez'aki",
      details:
        "Interesting offers, keen on anything suitable for a shadow sorcerer",
      offers: [],
    },
    {
      name: "Arcane Grimoire",
      rarity: "rare",
      owner: "Meepo",
      details: "Tome of int please",
      offers: [],
    },
  ]);

  return (
    <Grid container sx={{ margin: "0.4em" }} spacing={2}>
      {items.map((item) => {
        return (
          <Grid md={6} lg={4} xs={12}>
            <TradeItemOwned {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
}

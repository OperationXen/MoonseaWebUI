import React, { useState } from "react";

import { TextField, InputAdornment, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchIcon from "@mui/icons-material/Search";

import TradeItemOther from "./TradeItemOther";

export default function TradingPostSearch(props) {
  const [filter, setFilter] = useState("");
  const [items] = useState([
    {
      name: "Sunblade",
      rarity: "rare",
      owner: "Meepo",
      details: "Will trade for bracers of defense",
    },
  ]);

  return (
    <Stack alignItems={"center"} sx={{ margin: "0.4em" }}>
      <TextField
        label="Search the trading post"
        variant="standard"
        sx={{ width: "25em" }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Grid container sx={{ margin: "0.4em", width: "100%" }} spacing={2}>
        {items.map((item) => {
          return (
            <Grid md={6} lg={4} xs={12}>
              <TradeItemOther {...item} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

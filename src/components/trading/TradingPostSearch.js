import React, { useState, useEffect, useCallback } from "react";

import { Box, TextField, Button, InputAdornment, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import SearchIcon from "@mui/icons-material/Search";

import { searchAdverts } from "../../api/trade";
import TradeAdvert from "./TradeAdvert";

export default function TradingPostSearch(props) {
  const [filter, setFilter] = useState("");
  const [adverts, setAdverts] = useState([]);

  const handleSearch = useCallback(() => {
    searchAdverts(filter).then((response) => setAdverts(response.data));
  }, [filter]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Stack alignItems={"center"} sx={{ margin: "0.4em" }}>
      <Box sx={{ display: "flex" }}>
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
        <Button variant="outlined" onClick={handleSearch}>
          Go
        </Button>
      </Box>
      <Grid container sx={{ margin: "0.4em", width: "100%" }} spacing={2}>
        {adverts.map((advert) => {
          return (
            <Grid md={6} lg={4} xs={12}>
              <TradeAdvert {...advert} key={advert.uuid} market={true} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Container, Box, Typography, TextField } from "@mui/material";
import { Tabs, Tab, InputAdornment } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import SearchIcon from "@mui/icons-material/Search";
import HikingIcon from "@mui/icons-material/Hiking";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import TradingPostOffers from "../TradingPostOffers";
import TradingPostSearch from "../TradingPostSearch";
import TradingPostItems from "../TradingPostItems";

import { useUserStatus } from "@/data/fetch/auth";

export default function TradingPostWindow() {
  const { data: userStatus } = useUserStatus();
  const { section } = useParams();
  const router = useRouter();

  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!section) router.push("/tradingpost/market/");
  }, [router, section]);

  return (
    <Container
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100% - 2.5em)",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <TabContext value={(section as string) ?? "market"}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="0.5em 0"
        >
          <Typography variant="h4">Trading Post</Typography>
          <Box sx={{ display: section === "market" ? "flex" : "none" }}>
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
          </Box>
          <Tabs
            sx={{
              padding: "0 0.2em",
            }}
          >
            <Tab
              disabled={!userStatus?.authenticated}
              icon={<HikingIcon />}
              label="My Items"
              component={Link}
              href={"/tradingpost/items/"}
            />
            <Tab
              disabled={!userStatus?.authenticated}
              icon={<LocalOfferIcon />}
              label="Offers"
              component={Link}
              href={"/tradingpost/offers/"}
            />
            <Tab
              icon={<LocalGroceryStoreIcon />}
              label="Market"
              component={Link}
              href={"/tradingpost/market/"}
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            border: "1px solid black",
            borderRadius: "8px",
          }}
        >
          <TabPanel
            value="items"
            sx={{ flexGrow: 1, padding: 0, height: "100%" }}
          >
            <TradingPostItems />
          </TabPanel>
          <TabPanel
            value="offers"
            sx={{ flexGrow: 1, padding: 0, height: "100%" }}
          >
            <TradingPostOffers />
          </TabPanel>
          <TabPanel
            value="market"
            sx={{ flexGrow: 1, padding: 0, height: "100%" }}
          >
            <TradingPostSearch filter={filter} />
          </TabPanel>
        </Box>
      </TabContext>
    </Container>
  );
}

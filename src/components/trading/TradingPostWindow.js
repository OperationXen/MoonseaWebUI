import React, { useState } from "react";

import { Container, Box, Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import HikingIcon from "@mui/icons-material/Hiking";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import TradingPostItems from "./TradingPostItems";
import TradingPostOffers from "./TradingPostOffers";
import TradingPostSearch from "./TradingPostSearch";

export default function TradingPostWindow(props) {
  const [tab, setTab] = useState("magicitems");

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
      <TabContext value={tab}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="0.5em 0"
        >
          <Typography variant="h4">Trading Post (UI Mockup)</Typography>

          <Tabs
            value={tab}
            onChange={(e, n) => setTab(n)}
            sx={{
              padding: "0 0.2em",
            }}
          >
            <Tab icon={<HikingIcon />} label="My Items" value={"magicitems"} />
            <Tab icon={<LocalOfferIcon />} label="Offers" value={"offers"} />
            <Tab
              icon={<LocalGroceryStoreIcon />}
              label="Search"
              value={"search"}
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
            value="magicitems"
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
            value="search"
            sx={{ flexGrow: 1, padding: 0, height: "100%" }}
          >
            <TradingPostSearch />
          </TabPanel>
        </Box>
      </TabContext>
    </Container>
  );
}

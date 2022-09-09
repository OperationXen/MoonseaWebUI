import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Container, Box, Typography } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import HikingIcon from "@mui/icons-material/Hiking";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import TradingPostOffers from "./TradingPostOffers";
import TradingPostSearch from "./TradingPostSearch";
import TradingPostItems from "./TradingPostItems";
import userStore from "../../datastore/user";

export default function TradingPostWindow(props) {
  const { section } = useParams();
  const navigate = useNavigate();
  const authenticated = userStore((s) => s.authenticated);

  useEffect(() => {
    if (!section) navigate("/tradingpost/market/");
  }, [navigate, section]);

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
      <TabContext value={section}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="0.5em 0"
        >
          <Typography variant="h4">Trading Post</Typography>

          <Tabs
            sx={{
              padding: "0 0.2em",
            }}
          >
            <Tab
              disabled={!authenticated}
              icon={<HikingIcon />}
              label="My Items"
              component={Link}
              to={"/tradingpost/items/"}
            />
            <Tab
              disabled={!authenticated}
              icon={<LocalOfferIcon />}
              label="Offers"
              component={Link}
              to={"/tradingpost/offers/"}
            />
            <Tab
              icon={<LocalGroceryStoreIcon />}
              label="Market"
              component={Link}
              to={"/tradingpost/market/"}
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
            <TradingPostSearch />
          </TabPanel>
        </Box>
      </TabContext>
    </Container>
  );
}

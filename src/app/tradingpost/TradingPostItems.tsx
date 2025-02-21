import React from "react";

import { Box } from "@mui/material";

import TradeAdvert from "./TradeAdvert";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";
import useTradingPostAdverts from "@/data/fetch/tradingpost/items";

import type { Advert } from "@/types/trade";

export default function TradingPostItems() {
  const { data: tradeItems, isLoading } = useTradingPostAdverts();

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  } else if (tradeItems) {
    return (
      <Box className="flex flex-wrap flex-row p-2 gap-2 items-center justify-evenly h-full">
        {tradeItems.map((advert: Advert) => {
          return <TradeAdvert {...advert} key={advert.uuid} />;
        })}
      </Box>
    );
  } else {
    return <EmptyAdvertsWidget />;
  }
}

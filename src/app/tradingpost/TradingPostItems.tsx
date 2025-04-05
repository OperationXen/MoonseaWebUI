import React from "react";

import { Box } from "@mui/material";

import TradeAdvert from "./TradeAdvert";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";
import { useTradingPostAdverts } from "@/data/fetch/tradingpost/items";
import { useTradingPostOffers } from "@/data/fetch/tradingpost/offers";

import type { Advert } from "@/types/trade";

export default function TradingPostItems() {
  const {
    data: tradeAdverts,
    isLoading,
    refreshItems,
  } = useTradingPostAdverts();

  const { data: tradeOffers } = useTradingPostOffers();

  const getOffersForAdvert = (ad: Advert) => {
    return tradeOffers?.filter((offer) => offer.advert.uuid === ad.uuid);
  };

  if (isLoading) {
    return <LoadingOverlay open={true} />;
  } else if (tradeAdverts) {
    return (
      <Box className="flex flex-wrap flex-row p-2 gap-2 items-center justify-evenly h-full">
        {tradeAdverts.map((advert: Advert) => {
          return (
            <TradeAdvert
              {...advert}
              key={advert.uuid}
              offers={getOffersForAdvert(advert)}
              onRemove={() => refreshItems()}
            />
          );
        })}
      </Box>
    );
  } else {
    return <EmptyAdvertsWidget />;
  }
}

"use client";

import api from "../base";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { TradeOffer, TradeOfferDirection } from "@/types/trade";

/***************************************************************************/
async function getTradeOffers(
  direction?: TradeOfferDirection,
): Promise<TradeOffer[]> {
  return api
    .get("/api/data/magicitem/faeproposal", {
      params: { direction },
    })
    .then((response) => response.data as TradeOffer[]);
}

async function createOfferFn(): Promise<any> {}

/***************************************************************************/
export function useTradingPostOffers() {
  const queryKey = ["tradingpost", "offers", "own"];
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getTradeOffers(),
  });

  const refreshOffers = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const createOffer = useMutation({
    mutationFn: () => createOfferFn(),
    onSettled: () => refreshOffers(),
  });

  return { ...fetchData, createAdvert: createOffer.mutateAsync, refreshOffers };
}

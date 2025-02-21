"use client";

import api from "../base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { Advert } from "@/types/trade";

/***************************************************************************/
async function getUserAdverts(): Promise<Advert[]> {
  return api.get("/api/data/magicitem/faesuggestion/?own=true").then((r) => {
    return r.data as Advert[];
  });
}

async function getAdvert(uuid: UUID): Promise<Advert> {
  return api.get(`/api/data/magicitem/faesuggestion/${uuid}/`).then((r) => {
    return r.data.results as Advert;
  });
}

/***************************************************************************/
export function useTradingPostAdvert(uuid: UUID) {
  const queryKey = ["tradingpost", "advert", uuid];

  return useQuery({
    queryKey,
    queryFn: () => getAdvert(uuid),
  });
}

/***************************************************************************/
export function useTradingPostAdverts() {
  const queryKey = ["tradingpost", "adverts", "own"];

  const fetchData = useQuery({
    queryKey,
    queryFn: getUserAdverts,
  });

  return { ...fetchData };
}

export default useTradingPostAdverts;

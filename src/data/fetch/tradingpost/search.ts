"use client";

import api from "../base";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { Advert } from "@/types/trade";

export function searchAdverts(searchTerm: string) {
  return api
    .get("/api/data/magicitem/faesuggestion", {
      params: { search: searchTerm },
    })
    .then((results) => {
      return results.data as Advert[];
    });
}

export function useTradingPostSearch(searchTerm: string) {
  const queryClient = useQueryClient();
  const queryKey = ["tradingpost", "adverts", "search", searchTerm];

  const invalidateCached = queryClient.invalidateQueries({ queryKey });

  const fetchData = useQuery({
    queryKey,
    queryFn: () => searchAdverts(searchTerm),
  });

  return { ...fetchData, refreshData: invalidateCached };
}

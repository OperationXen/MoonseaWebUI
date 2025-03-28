"use client";

import api from "../base";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { Advert } from "@/types/trade";

/***************************************************************************/
async function getUserAdverts(): Promise<Advert[]> {
  return api.get("/api/data/magicitem/faesuggestion/?own=true").then((r) => {
    return r.data as Advert[];
  });
}

async function getAdvert(uuid: UUID): Promise<Advert> {
  return api.get(`/api/data/magicitem/faesuggestion/${uuid}`).then((r) => {
    return r.data.results as Advert;
  });
}

async function deleteAdvertFn(uuid: UUID) {
  return api.delete(`/api/data/magicitem/faesuggestion/${uuid}`);
}

/***************************************************************************/
export function useTradingPostAdvert(uuid: UUID) {
  const queryKey = ["tradingpost", "advert", uuid];
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getAdvert(uuid),
  });

  const deleteAdvert = useMutation({
    mutationFn: () => deleteAdvertFn(uuid),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["tradingpost", "adverts", "own"],
      }),
  });

  return { ...fetchData, deleteAdvert: deleteAdvert.mutateAsync };
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

import { useQuery } from "@tanstack/react-query";
import api from "./base";

import type {Consumable} from "../types/items"

const QUERY_KEY = "msc-consumables";


export const createConsumable = (characterUUID: string, itemData: Consumable) => {
  let data = { character_uuid: characterUUID, ...itemData };
  return api.post("/api/consumable/", data);
};

export const getConsumables = () => {
  return api.get("/api/consumable/");
};

export const getConsumableDetails = (uuid: string) => {
  return api.get(`/api/consumable/${uuid}`);
};

export function updateConsumable(data: Consumable) {
  return api.patch(`/api/consumable/${data.uuid}/`, data);
}

export function deleteConsumable(data: Consumable) {
  return api.delete(`/api/consumabl2e/${data.uuid}/`);
}

export function useConsumables() {
  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getConsumables,
  });

  return { isLoading, data };
}

export default useConsumables;

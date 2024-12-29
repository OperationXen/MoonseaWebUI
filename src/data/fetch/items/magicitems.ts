import { useQuery } from "@tanstack/react-query";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

function getMagicItemsFn(charUUID: UUID) {
  return api.get(`/api/data/character/${charUUID}`).then((response) => {
    debugger;

    return response.data.items as MagicItem[];
  });
}

export function useMagicItems(characterUUID: UUID) {
  const queryKey = ["items", "magic", "character", characterUUID];

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getMagicItemsFn(characterUUID),
  });
  const updateItem = (_x: any) => {
    return Promise.resolve(null);
  };
  const deleteItem = (_x: any) => {
    return Promise.resolve(null);
  };

  return { ...fetchData, updateItem, deleteItem };
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

function getUserMagicItemsFn() {
  return api.get(`/api/data/magicitem`).then((response) => {
    return response.data as MagicItem[];
  });
}

export function useMagicItems() {
  const fetchData = useQuery({
    queryKey: ["user", "magicitems"],
    queryFn: getUserMagicItemsFn,
  });

  return { ...fetchData };
}

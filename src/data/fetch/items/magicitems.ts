import { useQuery } from "@tanstack/react-query";

import api from "../base";

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

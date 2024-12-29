import { useQuery } from "@tanstack/react-query";

import api from "../base";

import type { MagicItem } from "@/types/items";

function getUserMagicItemsFn() {
  return api.get(`/api/data/magicitem`).then((response) => {
    return response.data as MagicItem[];
  });
}

export function useUserMagicItems() {
  const fetchData = useQuery({
    queryKey: ["items", "magic", "user"],
    queryFn: getUserMagicItemsFn,
  });

  return { ...fetchData };
}

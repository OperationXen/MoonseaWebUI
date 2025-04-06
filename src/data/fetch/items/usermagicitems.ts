import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "../base";

import type { MagicItem } from "@/types/items";

function getUserMagicItemsFn() {
  return api.get(`/api/data/magicitem`).then((response) => {
    return response.data as MagicItem[];
  });
}

export function useUserMagicItems() {
  const queryKey = ["items", "magic", "user"];
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey,
    queryFn: getUserMagicItemsFn,
  });

  const refreshItems = () => queryClient.invalidateQueries({ queryKey });

  return { ...fetchData, refreshItems };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

function getMagicItemsFn(charUUID: UUID) {
  return api.get(`/api/data/character/${charUUID}`).then((response) => {
    return response.data.items as MagicItem[];
  });
}

function updateMagicItemFn(item: Partial<MagicItem>) {
  return api.patch(`/api/data/magicitem/${item.uuid}`, item);
}

function deleteMagicItemFn(item: Partial<MagicItem>) {
  return api.delete(`/api/data/magicitem/${item.uuid}`);
}

/**********************************************************************************/
// TODO: This optimistic update code should be revisited once we have a "get items for this character" endpoint
export function useMagicItems(characterUUID: UUID) {
  const queryKey = ["items", "magic", "character", characterUUID];
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getMagicItemsFn(characterUUID),
  });
  const updateItem = useMutation({
    mutationFn: updateMagicItemFn,
    onSettled: (_item) => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteItem = useMutation({
    mutationFn: deleteMagicItemFn,
    onSettled: (_item) => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    ...fetchData,
    updateItem: updateItem.mutateAsync,
    deleteItem: deleteItem.mutateAsync,
  };
}

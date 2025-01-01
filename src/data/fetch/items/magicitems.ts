import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type CharUUID = { character_uuid: UUID };

function getMagicItemsFn(charUUID: UUID) {
  return api.get(`/api/data/character/${charUUID}`).then((response) => {
    return response.data.items as MagicItem[];
  });
}

function getMagicItemFn(itemUUID: UUID) {
  return api.get(`/api/data/magicitem/${itemUUID}`).then((response) => {
    return response.data as MagicItem;
  });
}

function createMagicItemFn(
  item: Partial<MagicItem & CharUUID>,
  characterUUID?: UUID,
) {
  if (characterUUID) item.character_uuid = characterUUID;
  return api.post("/api/data/magicitem", item);
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const createItem = useMutation({
    mutationFn: (item: Partial<MagicItem>) =>
      createMagicItemFn(item, characterUUID),
    onSettled: () => {
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
    createItem: createItem.mutateAsync,
    updateItem: updateItem.mutateAsync,
    deleteItem: deleteItem.mutateAsync,
  };
}

export function useMagicItem(uuid: UUID, characterUUID?: UUID) {
  const queryKey = ["items", "magic", "individual", uuid];
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
    if (characterUUID)
      queryClient.invalidateQueries({
        queryKey: ["items", "magic", "character", characterUUID],
      });
  };

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getMagicItemFn(uuid),
  });

  const updateItem = useMutation({
    mutationFn: updateMagicItemFn,
    onMutate: async (newData: Partial<MagicItem>) => {
      await queryClient.cancelQueries({ queryKey });
      const oldData = queryClient.getQueryData(queryKey) as MagicItem;

      queryClient.setQueryData(queryKey, { ...oldData, ...newData });
      // Return a context with the old data and the new
      return { oldData, newItem: newData };
    },
    onError: (_err, _newChar: Partial<MagicItem>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldData);
      }
    },
    onSettled: invalidate,
  });

  const deleteItem = useMutation({
    mutationFn: deleteMagicItemFn,
    onSettled: invalidate,
  });

  return {
    ...fetchData,
    updateItem: updateItem.mutateAsync,
    deleteItem: deleteItem.mutateAsync,
  };
}

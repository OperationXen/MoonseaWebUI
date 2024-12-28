import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";

// mixin type for posts which also contain a character_uuid field
type CharacterUUID = { character_uuid: UUID };

/******************************************************************/
function createConsumableFn(itemData: Partial<Consumable> & CharacterUUID) {
  return api.post("/api/data/consumable", itemData);
}

function getConsumables() {
  return api.get("/api/data/consumable").then((response) => {
    return response.data as Consumable[];
  });
}

function getConsumableDetails(uuid: string) {
  return api.get(`/api/data/consumable/${uuid}`);
}

function updateConsumableFn(data: Partial<Consumable>) {
  return api.patch(`/api/data/consumable/${data.uuid}/`, data);
}

function deleteConsumableFn(data: Consumable) {
  return api.delete(`/api/data/consumable/${data.uuid}/`);
}
/******************************************************************/
// Functions for doing optimistic updates to state
function updateConsumableData(
  data: Consumable[],
  element: Partial<Consumable>,
) {
  const newState = produce(data, (draft) => {
    const index = draft.findIndex((c) => c.uuid === element.uuid);
    draft[index] = { ...draft[index], ...element };
  });
  return newState;
}

function deleteConsumableData(data: Consumable[], deleted: Consumable) {
  const newState = produce(data, (draft) => {
    const index = draft.findIndex((c) => c.uuid === deleted.uuid);
    if (index !== -1) draft.splice(index, 1);
  });
  return newState;
}
/******************************************************************/
// get details for a single consumable item (for details window etc)
export function useConsumable(consumableUUID: UUID, characterUUID?: UUID) {
  const queryClient = useQueryClient();

  const fetchConsumable = useQuery({
    queryKey: ["items", "consumable", "individual", consumableUUID],
    queryFn: () => getConsumableDetails(consumableUUID),
  });

  const updateConsumable = useMutation({
    mutationFn: updateConsumableFn,
    onMutate: async (newConsumable) => {
      await queryClient.cancelQueries({
        queryKey: ["items", "consumable", consumableUUID],
      });
      // Snapshot the previous value
      const previousConsumable = queryClient.getQueryData([
        "items",
        "consumable",
        consumableUUID,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["items", "consumable", consumableUUID],
        newConsumable,
      );
      // Return a context with the previous and new todo
      return { previousConsumable, newConsumable };
    },
    // Always refetch after error or success:
    onSettled: (_newConsumable) => {
      queryClient.invalidateQueries({
        queryKey: ["items", "consumable", consumableUUID],
      });
      if (characterUUID) {
        queryClient.invalidateQueries({
          queryKey: ["items", "consumable", "character", characterUUID],
        });
      }
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, newConsumable, context) => {
      queryClient.setQueryData(
        ["items", "consumable", newConsumable.uuid],
        context?.previousConsumable,
      );
    },
  });
  return { ...fetchConsumable, update: updateConsumable.mutateAsync };
}

export function useConsumables(characterUUID: UUID) {
  const queryClient = useQueryClient();
  const queryKey = ["items", "consumable", "character", characterUUID];

  const dataFetch = useQuery({
    queryKey: queryKey,
    queryFn: getConsumables,
  });

  const createConsumable = useMutation({
    mutationFn: (itemData: Partial<Consumable>) =>
      createConsumableFn({ character_uuid: characterUUID, ...itemData }),
    // Always refetch after error or success:
    onSettled: (_newConsumable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
  const deleteConsumable = useMutation({
    mutationFn: deleteConsumableFn,
    // Always refetch after error or success:
    onSettled: (_newConsumable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    // optimistic update
    onMutate: async (deleted) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: Consumable[]) => {
        return deleteConsumableData(old, deleted);
      });
      return { previousData };
    },
  });

  const updateConsumable = useMutation({
    mutationFn: updateConsumableFn,
    onMutate: async (newConsumable) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: Consumable[]) => {
        return updateConsumableData(old, newConsumable);
      });
      // Return a context with the previous state
      return { previousData };
    },
    // Always refetch after error or success:
    onSettled: (_newConsumable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, newConsumable, context) => {
      queryClient.setQueryData(
        ["items", "consumable", newConsumable.uuid],
        context?.previousData,
      );
    },
  });

  return {
    ...dataFetch,
    createConsumable: createConsumable.mutateAsync,
    deleteConsumable: deleteConsumable.mutateAsync,
    updateConsumable: updateConsumable.mutateAsync,
  };
}

export default useConsumables;

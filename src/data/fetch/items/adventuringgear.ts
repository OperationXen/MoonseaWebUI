import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { AdventuringGear } from "@/types/items";

// mixin type for posts which also contain a character_uuid field
type CharacterUUID = { character_uuid: UUID };

/******************************************************************/
function createAdventuringGearFn(
  itemData: Partial<AdventuringGear> & CharacterUUID,
) {
  return api.post("/api/data/adventuringgear", itemData);
}

function getAdventuringGearFn() {
  return api.get("/api/data/adventuringgear").then((response) => {
    return response.data as AdventuringGear[];
  });
}

function updateAdventuringGearFn(data: Partial<AdventuringGear>) {
  return api.patch(`/api/data/adventuringgear/${data.uuid}/`, data);
}

function deleteAdventuringGearFn(data: AdventuringGear) {
  return api.delete(`/api/data/adventuringgear/${data.uuid}/`);
}
/******************************************************************/
// Functions for doing optimistic updates to state
function updateAdventuringGearData(
  data: AdventuringGear[],
  element: Partial<AdventuringGear>,
) {
  const newState = produce(data, (draft) => {
    const index = draft.findIndex((c) => c.uuid === element.uuid);
    draft[index] = { ...draft[index], ...element };
  });
  return newState;
}

function deleteAdventuringGearData(
  data: AdventuringGear[],
  deleted: AdventuringGear,
) {
  const newState = produce(data, (draft) => {
    const index = draft.findIndex((c) => c.uuid === deleted.uuid);
    if (index !== -1) draft.splice(index, 1);
  });
  return newState;
}

export function useAdventuringGear(characterUUID: UUID) {
  const queryClient = useQueryClient();
  const queryKey = ["items", "adventuringgear", "character", characterUUID];

  const dataFetch = useQuery({
    queryKey: queryKey,
    queryFn: getAdventuringGearFn,
  });

  const createAdventuringGear = useMutation({
    mutationFn: (itemData: AdventuringGear) =>
      createAdventuringGearFn({ character_uuid: characterUUID, ...itemData }),
    // Always refetch after error or success:
    onSettled: (_newConsumable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
  const deleteAdventuringGear = useMutation({
    mutationFn: deleteAdventuringGearFn,
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
      queryClient.setQueryData(queryKey, (old: AdventuringGear[]) => {
        return deleteAdventuringGearData(old, deleted);
      });
      return { previousData };
    },
  });

  const updateAdventuringGear = useMutation({
    mutationFn: updateAdventuringGearFn,
    onMutate: async (newGear) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });
      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, (old: AdventuringGear[]) => {
        return updateAdventuringGearData(old, newGear);
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
  });

  return {
    ...dataFetch,
    createAdventuringGear: createAdventuringGear.mutateAsync,
    deleteAdventuringGear: deleteAdventuringGear.mutateAsync,
    updateAdventuringGear: updateAdventuringGear.mutateAsync,
  };
}

export default useAdventuringGear;

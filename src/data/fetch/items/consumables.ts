import { useMutation, useQuery } from "@tanstack/react-query";

import api from "../base";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";

// mixin type for posts which also contain a character_uuid field
type CharacterUUID = { character_uuid: UUID };

async function createConsumableFn(
  itemData: Partial<Consumable> & CharacterUUID,
) {
  return api.post("/api/data/consumable", itemData);
}

export const getConsumables = () => {
  return api.get("/api/data/consumable").then((response) => {
    return response.data as Consumable[];
  });
};

export const getConsumableDetails = (uuid: string) => {
  return api.get(`/api/data/consumable/${uuid}`);
};

export function updateConsumableFn(data: Consumable) {
  return api.patch(`/api/data/consumable/${data.uuid}/`, data);
}

export function deleteConsumableFn(data: Consumable) {
  return api.delete(`/api/data/consumable/${data.uuid}/`);
}

/******************************************************************/
// get details for a single consumable item (for details window etc)
export function useConsumable(consumableUUID: UUID) {
  return useQuery({
    queryKey: ["items", "consumable", "individual", consumableUUID],
    queryFn: () => getConsumableDetails(consumableUUID),
  });
}

export function useConsumables(characterUUID: UUID) {
  const dataFetch = useQuery({
    queryKey: ["items", "consumable", "character", characterUUID],
    queryFn: getConsumables,
  });

  const createConsumable = useMutation({
    mutationFn: (itemData: Partial<Consumable>) =>
      createConsumableFn({ character_uuid: characterUUID, ...itemData }),
  });
  const deleteConsumable = useMutation({ mutationFn: deleteConsumableFn });
  const updateConsumable = useMutation({ mutationFn: updateConsumableFn });

  return {
    ...dataFetch,
    createConsumable: createConsumable.mutateAsync,
    deleteConsumable: deleteConsumable.mutateAsync,
    updateConsumable: updateConsumable.mutateAsync,
  };
}

export default useConsumables;

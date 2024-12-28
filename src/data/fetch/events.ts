"use client";

import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { CharacterEvent } from "@/types/events";

function getEventsFn(characterUUID: UUID) {
  return api.get(`/api/data/character_events/${characterUUID}`).then((r) => {
    return r.data as CharacterEvent[];
  });
}

function createEventFn(char: UUID, event: Partial<CharacterEvent>) {
  event.character_uuid = char;

  switch (event.event_type) {
    case "dt_catchingup":
      return api.post("/api/data/catchingup", event);
    case "dt_mtrade":
      return api.post("/api/data/mundanetrade", event);
    case "dt_sbookupd":
      return api.post("/api/data/spellbook", event);
    default:
      return Promise.resolve(null);
  }
}

export function useEvents(characterUUID: UUID) {
  const queryClient = useQueryClient();

  const fetchData = useQuery({
    queryKey: ["events", "all", "character", characterUUID],
    queryFn: () => getEventsFn(characterUUID),
  });

  const createEvent = useMutation({
    mutationFn: (data: Partial<CharacterEvent>) =>
      createEventFn(characterUUID, data),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["events", "all", "character", characterUUID],
      }),
  });

  return { ...fetchData, createEvent: createEvent.mutateAsync };
}

// export async function getCharacter(ID: string) {
//   return api.get(`/api/data/character/${ID}`).then((r) => {
//     return r.data as Character;
//   });
// }

// export async function updateCharacterFn(data: Partial<Character>) {
//   return api
//     .patch(`/api/data/character/${data.uuid}/`, { ...data })
//     .then((r) => r.data as Character);
// }

// export function useCharacters() {
//   return useQuery({
//     queryKey: ["characters"],
//     queryFn: () => getCharacters(),
//   });
// }

// export function useCharacter(uuid: UUID) {
//   const queryClient = useQueryClient();

//   const fetchData = useQuery({
//     queryKey: ["character", uuid],
//     queryFn: () => getCharacter(uuid),
//   });

//   const updateCharacter = useMutation({
//     mutationFn: (charData: Partial<Character>) =>
//       updateCharacterFn({ ...charData, uuid: uuid }),
//     onMutate: async (newChar: Partial<Character>) => {
//       // Cancel any outgoing refetches to avoid overwriting optimistic update
//       await queryClient.cancelQueries({
//         queryKey: ["character", newChar.uuid],
//       });
//       // Snapshot the previous value
//       const oldCharData = queryClient.getQueryData(["character", newChar.uuid]);
//       // Optimistically update to the new value
//       queryClient.setQueryData(["character", newChar.uuid], newChar);
//       // Return a context with the old data and the new
//       return { oldCharData, newChar };
//     },
//     // If the mutation fails, use the context we returned above
//     onError: (_err, _newChar: Partial<Character>, context) => {
//       if (context) {
//         queryClient.setQueryData(
//           ["character", context.newChar.uuid],
//           context.oldCharData,
//         );
//       }
//     },
//     // Always refetch after error or success:
//     onSettled: (newChar: Character | undefined) => {
//       if (newChar) {
//         queryClient.invalidateQueries({
//           queryKey: ["character", newChar.uuid],
//         });
//       }
//     },
//   });

//   return { ...fetchData, updateCharacter: updateCharacter.mutateAsync };
// }

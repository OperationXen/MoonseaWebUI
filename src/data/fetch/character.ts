"use client";

import axios from "axios";
import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { Character } from "@/types/character";

export async function getCharacters() {
  return axios.get("/api/data/character").then((r) => {
    return r.data.results as Character[];
  });
}

export async function getCharacter(ID: string) {
  return api.get(`/api/data/character/${ID}`).then((r) => {
    return r.data as Character;
  });
}

export async function updateCharacterFn(
  data: Partial<Character>,
  charUUID: UUID,
) {
  data.uuid = charUUID;
  return api
    .patch(`/api/data/character/${charUUID}/`, data)
    .then((r) => r.data as Character);
}

export function useCharacters() {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => getCharacters(),
  });
}

export function useCharacter(uuid: UUID) {
  const queryClient = useQueryClient();
  const queryKey = ["character", uuid];

  const fetchData = useQuery({
    queryKey,
    queryFn: () => getCharacter(uuid),
  });

  const refreshCharacter = () => queryClient.invalidateQueries({ queryKey });

  const updateCharacter = useMutation({
    mutationFn: (charData: Partial<Character>) =>
      updateCharacterFn(charData, uuid),
    onMutate: async (newChar: Partial<Character>) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey });
      // Snapshot the previous value
      const oldCharData = queryClient.getQueryData(queryKey);
      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, newChar);
      // Return a context with the old data and the new
      return { oldCharData, newChar };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newChar: Partial<Character>, context) => {
      if (context) {
        queryClient.setQueryData(queryKey, context.oldCharData);
      }
    },
    // Always refetch after error or success:
    onSettled: (newChar: Character | undefined) => {
      if (newChar) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  return {
    ...fetchData,
    updateCharacter: updateCharacter.mutateAsync,
    refreshCharacter: refreshCharacter,
  };
}

"use client";

import axios from "axios";

import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export async function updateCharacter(data: Character) {
  return api
    .patch(`/api/data/character/${data.uuid}/`, data)
    .then((r) => r.data as Character);
}

export function characterQuery(characterUUID: string) {
  const query = useQuery({
    queryKey: ["character", characterUUID],
    queryFn: () => getCharacter(characterUUID),
  });

  return query;
}

export function useCharacters() {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => getCharacters(),
  });
}

export function characterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (char: Character) => updateCharacter(char),
    onMutate: async (newChar: Character) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: ["character", newChar.uuid],
      });
      // Snapshot the previous value
      const oldCharData = queryClient.getQueryData(["character", newChar.uuid]);
      // Optimistically update to the new value
      queryClient.setQueryData(["character", newChar.uuid], newChar);
      // Return a context with the old data and the new
      return { oldCharData, newChar };
    },
    // If the mutation fails, use the context we returned above
    onError: (_err, _newChar: Character, context) => {
      if (context) {
        queryClient.setQueryData(
          ["character", context.newChar.uuid],
          context.oldCharData,
        );
      }
    },
    // Always refetch after error or success:
    onSettled: (newChar: Character | undefined) => {
      if (newChar) {
        queryClient.invalidateQueries({
          queryKey: ["character", newChar.uuid],
        });
      }
    },
  });
}

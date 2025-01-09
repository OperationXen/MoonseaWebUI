"use client";

import axios from "axios";
import api from "./base";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { UUID } from "@/types/uuid";
import type { Character } from "@/types/character";

function getCharacters() {
  return axios.get("/api/data/character").then((r) => {
    return r.data.results as Character[];
  });
}

function getCharacter(ID: string) {
  return api.get(`/api/data/character/${ID}`).then((r) => {
    return r.data as Character;
  });
}

function createCharacterFn(charData: Partial<Character>) {
  return api.post("/api/data/character", charData);
}

function updateCharacterFn(data: Partial<Character>, charUUID: UUID) {
  data.uuid = charUUID;
  return api
    .patch(`/api/data/character/${charUUID}`, data)
    .then((r) => r.data as Character);
}

/*********************************************************************/
export function useCharacters() {
  const queryClient = useQueryClient();
  const queryKey = ["characters"];

  const fetchData = useQuery({
    queryKey: ["characters"],
    queryFn: () => getCharacters(),
  });

  const createCharacter = useMutation({
    mutationFn: (charData: Partial<Character>) => createCharacterFn(charData),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { ...fetchData, createCharacter: createCharacter.mutateAsync };
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
      await queryClient.cancelQueries({ queryKey });
      const oldCharData = queryClient.getQueryData(queryKey) as Character;

      queryClient.setQueryData(queryKey, { ...oldCharData, ...newChar });
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

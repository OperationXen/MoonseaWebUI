"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { Character } from "@/types/character";
import { getCharacter, updateCharacter2 } from "api/character";

export function characterQuery(characterUUID: string){
    const query = useQuery({
    queryKey: ['characters', characterUUID],
    queryFn: () => getCharacter(characterUUID),
  });

  return query;
}

export function characterMutation() {
	const queryClient = useQueryClient();
  const mutation = useMutation({
		mutationFn: (char: Character) => updateCharacter2(char),
		onMutate: async (newChar: Character) => {
			// Cancel any outgoing refetches to avoid overwriting optimistic update
			await queryClient.cancelQueries({ queryKey: ['characters', newChar.uuid] });
			// Snapshot the previous value
			const oldCharData = queryClient.getQueryData(['characters', newChar.uuid]);
			// Optimistically update to the new value
			queryClient.setQueryData(['characters', newChar.uuid], newChar);
			// Return a context with the old data and the new
			return { oldCharData, newChar }
		},
		// If the mutation fails, use the context we returned above
		onError: (_err, _newChar: Character, context) => {
			if (context){
				queryClient.setQueryData(
					['characters', context.newChar.uuid],
					context.oldCharData,
				)	
			}
		},
		// Always refetch after error or success:
		onSettled: (newChar: Character | undefined) => {
			if (newChar) {
				queryClient.invalidateQueries({ queryKey: ['characters', newChar.uuid] })
			}
		},
	})
	return mutation;
}
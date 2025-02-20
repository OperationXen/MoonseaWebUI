"use client";

import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";

import CharacterDetails from "@/components/characters/CharacterDetails";
import useSnackbar from "@/datastore/snackbar";

import type { UUID } from "@/types/uuid";

type PropsType = {
  params: { characterUUID: UUID };
};

export default function CharacterPage(props: PropsType) {
  const { characterUUID } = props.params;

  const router = useRouter();
  const { displayMessage } = useSnackbar();

  return (
    <ErrorBoundary
      onError={() => {
        displayMessage("Character not found", "error");
        router.push("/characters");
      }}
      fallback={"Error"}
    >
      <CharacterDetails characterUUID={characterUUID} />
    </ErrorBoundary>
  );
}

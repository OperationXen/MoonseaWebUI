"use client";

import { Dialog } from "@mui/material";

import JoinExistingGame from "@/components/events/games/JoinExistingGame";
import type { UUID } from "@/types/uuid";

type PropsType = {
  params: { uuid: string };
};

export default function JoinGameModal(props: PropsType) {
  const { uuid } = props.params;

  return (
    <Dialog open={true}>
      <JoinExistingGame uuid={uuid as UUID} />
    </Dialog>
  );
}

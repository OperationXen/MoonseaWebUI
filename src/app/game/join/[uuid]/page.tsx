import { Container, Box } from "@mui/material";

import JoinExistingGame from "@/components/events/games/JoinExistingGame";

import type { UUID } from "@/types/uuid";

type PropsType = {
  params: { uuid: string };
};

export default function JoinGameModal(props: PropsType) {
  const { uuid } = props.params;

  return (
    <Container className="flex h-[calc(100vh-3.5rem)] p-4 w-full items-center justify-center">
      <Box className="min-w-[32rem] max-w-[50rem] min-h-[32rem]">
        <JoinExistingGame uuid={uuid as UUID} />
      </Box>
    </Container>
  );
}

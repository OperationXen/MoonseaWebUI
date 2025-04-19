"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Box, Typography, Button, SelectChangeEvent } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Paper, Divider } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useCharacters } from "@/data/fetch/character";
import { useGame } from "@/data/fetch/events/games";
import { getCharClassShort } from "@/utils/format";
import { formatDateTimeString } from "@/utils/format";

import type { UUID } from "@/types/uuid";

type PropsType = {
  uuid: UUID;
  characterUUID?: UUID;
};

export function JoinExistingGame(props: PropsType) {
  const { uuid, characterUUID } = props;

  const { data: game, isLoading: gameLoading, joinGame } = useGame(uuid);
  const { data: characters } = useCharacters();
  const { displayMessage } = useSnackbar();
  const router = useRouter();

  const [character, setCharacter] = useState("");

  const handleCharacterJoin = () => {
    joinGame(character as UUID).then(() => {
      const char = characters?.find((c) => c.uuid === character);

      displayMessage(
        `${char?.name || "Unknown character"} added to game ${game?.name}`,
        "success",
      );
      router.push(`/character/${character}`);
    });
  };

  if (gameLoading) return null;

  return (
    <Paper sx={{ height: "100%", width: "100%", padding: "8px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="p-2"
      >
        <Typography variant="h5">Join an existing game</Typography>
      </Box>
      <Divider />
      <Box className="p-2 flex flex-col gap-1">
        <Typography>{`Game: ${game?.name || "Unnamed game"} (${game?.module || "?"})`}</Typography>
        <Typography>{`Game time: ${formatDateTimeString(game?.datetime)}`}</Typography>
        <Typography>{`Dungeon master: ${game?.dm_name}`}</Typography>
        {game?.notes && (
          <Typography variant="caption">{game?.notes}</Typography>
        )}
        <Divider>Rewards</Divider>
        <Box
          sx={{
            border: "1px dashed lightgrey",
            borderRadius: "8px",
            padding: "4px",
          }}
        >
          <Typography variant="body1">{`Gold: ${game?.gold}\tDowntime: ${game?.downtime}`}</Typography>
        </Box>

        <Divider>Character picker</Divider>
        <Box className="flex gap-2">
          <FormControl className="flex-grow">
            <InputLabel>Select character</InputLabel>
            <Select
              label="Select character"
              value={character as string}
              onChange={(e: SelectChangeEvent) =>
                setCharacter(e.target.value as UUID)
              }
            >
              {characters?.map((c) => {
                return (
                  <MenuItem value={c.uuid} key={c.uuid}>
                    {`${c.name} - ${getCharClassShort(c.classes)}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            disabled={!character}
            onClick={handleCharacterJoin}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default JoinExistingGame;

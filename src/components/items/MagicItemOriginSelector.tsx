"use client";

import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";

import { useCharacterGames } from "@/data/fetch/games";
import { getDateString } from "@/utils/format";

import type { GameEvent } from "@/types/events";
import type { UUID } from "@/types/uuid";

type PropsType = {
  characterUUID: UUID;
  originGame: string;
  setOriginGame: (x: string) => void;
};

export function MagicItemOriginSelector(props: PropsType) {
  const { characterUUID, originGame, setOriginGame } = props;

  const { data: games } = useCharacterGames(characterUUID);

  const getGameName = (game: GameEvent) => {
    const date = new Date(game.datetime);

    return `${getDateString(date)} - ${game.name || "Unnamed game"} (${game.module})`;
  };

  const handleOriginChange = (e: SelectChangeEvent) => {
    setOriginGame(e.target.value);
  };

  return (
    <FormControl sx={{ flexGrow: 1, flexBasis: 2 }}>
      <InputLabel id="type-label">Origin</InputLabel>
      <Select label="Origin" value={originGame} onChange={handleOriginChange}>
        {games?.map((g) => (
          <MenuItem key={g.uuid} value={g.uuid}>
            {getGameName(g)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MagicItemOriginSelector;

"use client";

import { Select, MenuItem, SelectChangeEvent, Divider } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";

import { useGames } from "@/data/fetch/games";
import { getDateString } from "@/utils/format";

import type { GameEvent } from "@/types/events";
import type { ItemSource } from "@/types/items";
import type { UUID } from "@/types/uuid";

type PropsType = {
  characterUUID: UUID;
  origin?: ItemSource;
  setOrigin: (x: ItemSource) => void;
};

export function MagicItemOriginSelector(props: PropsType) {
  const { characterUUID, origin, setOrigin } = props;

  const { data: games } = useGames({ charUUID: characterUUID });

  const getGameName = (game: GameEvent) => {
    const date = new Date(game.datetime);

    return `Game: ${getDateString(date)} - ${game.name || "Unnamed game"} (${game.module})`;
  };

  const handleOriginChange = (e: SelectChangeEvent) => {
    const [source_type, source] = e.target.value.split("_");
    switch (source_type) {
      case "level5":
        setOrigin({
          item_source_type: "level5",
          item_source: "item",
        } as ItemSource);
        return;
      case "trade":
        setOrigin({
          item_source_type: "trade",
          item_source: "item",
        } as ItemSource);
        return;
      case "dmreward":
        setOrigin({
          item_source_type: "dmreward",
          item_source: "item",
        } as ItemSource);
        return;
      case "game":
        setOrigin({
          item_source: source,
          item_source_type: "game",
        } as ItemSource);
        return;
    }
  };

  return (
    <FormControl sx={{ flexGrow: 1, flexBasis: 2 }}>
      <InputLabel id="type-label">Origin</InputLabel>
      <Select
        label="Origin"
        value={`${origin?.item_source_type}_${origin?.item_source}`}
        onChange={handleOriginChange}
      >
        <MenuItem value={"level5_item"}>Level 5 item reward</MenuItem>
        <MenuItem value={"trade_item"}>External trade</MenuItem>
        <MenuItem value={"dmreward_item"}>DM reward</MenuItem>
        <Divider />
        {games?.map((g) => (
          <MenuItem key={g.uuid} value={`game_${g.uuid}`}>
            {getGameName(g)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MagicItemOriginSelector;

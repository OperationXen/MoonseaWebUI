import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

import { usePlayerGames } from "@/data/fetch/player-games";
import { getDateString } from "@/utils/format";

import type { CharacterGames } from "@/types/games";
import type { UUID } from "@/types/uuid";

type CharGameRow = {
  module: string;
  name: string;
  gameUUID: UUID;
  character: string;
  characterUUID: UUID;
  datetime: Date | null;
};

type PropsType = {
  search: string;
};

export function ModulesGrid(props: PropsType) {
  const { search } = props;

  const { data } = usePlayerGames();

  const flattenGames = (raw: CharacterGames[]): CharGameRow[] => {
    const retval: CharGameRow[] = [];

    raw.map((cg) =>
      cg.games.map((game) => {
        retval.push({
          module: game.module,
          name: game.name,
          gameUUID: game.uuid,
          datetime: game.datetime,
          character: cg.character.name,
          characterUUID: cg.character.uuid,
        });
      }),
    );
    return retval;
  };

  const filterGames = (charGames: CharGameRow[]) => {
    const searchVal = search.toUpperCase();

    return charGames.filter((cg) => {
      if (cg.module.toUpperCase().startsWith(searchVal)) return true;
      if (cg.character.toUpperCase().startsWith(searchVal)) return true;
      if (cg.name.toUpperCase().includes(searchVal)) return true;

      return false;
    });
  };

  const columns: GridColDef<CharGameRow>[] = [
    {
      field: "module",
      headerName: "Module code",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Module Name",
      flex: 1,
    },
    { field: "character", headerName: "Character name", flex: 1 },
    {
      field: "datetime",
      headerName: "Date / Time",
      flex: 1,
      valueFormatter: (val) => {
        return getDateString(new Date(val));
      },
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={filterGames(flattenGames(data || []))}
      getRowId={(r) => r.gameUUID}
    />
  );
}

export default ModulesGrid;

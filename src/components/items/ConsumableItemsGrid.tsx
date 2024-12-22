import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useConsumables } from "@/data/fetch/items/consumables";

import EmptyWindowWidget from "./widgets/EmptyWindowWidget";
import ConsumableItemWidget from "./widgets/ConsumableItemWidget";
import ConsumableDialog from "./ConsumableDialog";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function ConsumableItemsGrid(props: PropsType) {
  const { characterUUID, editable } = props;

  const {
    data: consumableItems,
    updateConsumable,
    deleteConsumable,
  } = useConsumables(characterUUID);

  const [createOpen, setCreateOpen] = useState(false);

  const columns: GridColDef<Consumable>[] = [{ field: "uuid" }];

  return (
    <DataGrid
      getRowId={(x) => x.uuid}
      columns={columns}
      rows={consumableItems}
      initialState={{
        columns: {
          columnVisibilityModel: { uuid: false },
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10, 15, 20, 25, 50]}
      checkboxSelection
      density="compact"
    />
  );
}

export default ConsumableItemsGrid;

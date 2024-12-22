import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useConsumables } from "@/data/fetch/items/consumables";
import ConsumableItemsGridFooter from "./ConsumableItemsGridFooter";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";
import RarityWidget from "./widgets/RarityWidget";
import { ConsumableTypeWidget } from "./widgets/ConsumableTypeWidget";

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

  const renderEquipped = (params: GridRenderCellParams<Consumable>) => {
    return (
      <Box className="flex items-center h-full w-full justify-center">
        <Checkbox />
      </Box>
    );
  };

  const columns: GridColDef<Consumable>[] = [
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "type",
      headerName: "Consumable type",
      flex: 1,
      renderCell: (p) => {
        return <ConsumableTypeWidget type={p.row.type} />;
      },
    },
    {
      field: "rarity",
      headerName: "Rarity",
      flex: 1,
      renderCell: (p) => {
        return (
          <Box className="flex items-center h-full">
            <RarityWidget rarity={p.row.rarity} text />
          </Box>
        );
      },
    },
    {
      field: "charges",
      headerName: "Charges",
      flex: 1,
      renderCell: (p) => {
        return (
          <Box className="flex items-center justify-between">
            <IconButton>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body1">{p.row.charges}</Typography>
            <IconButton>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "equipped",
      headerName: "Item equipped",
      flex: 1,
      renderCell: renderEquipped,
    },
    {
      field: "controls",
      headerName: "",
      renderCell: () => {
        return (
          <Box className="flex items-center justify-end">
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <DataGrid
      getRowId={(x) => x.uuid}
      columns={columns}
      rows={consumableItems}
      initialState={{
        sorting: {
          sortModel: [{ field: "equipped", sort: "desc" }],
        },
        columns: {
          columnVisibilityModel: { description: false },
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      slots={{
        footer: ConsumableItemsGridFooter,
      }}
      pageSizeOptions={[10, 15, 20, 25, 50]}
      density="compact"
    />
  );
}

export default ConsumableItemsGrid;
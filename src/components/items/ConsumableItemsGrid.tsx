import React, { ChangeEvent, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useConsumable, useConsumables } from "@/data/fetch/items/consumables";
import ConsumableItemsGridFooter from "./ConsumableItemsGridFooter";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";
import RarityWidget from "./widgets/RarityWidget";
import { ConsumableTypeWidget } from "./widgets/ConsumableTypeWidget";
import CreateMagicItem from "./CreateMagicItem";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function ConsumableItemsGrid(props: PropsType) {
  const { characterUUID } = props;
  console.log(characterUUID);

  const {
    data: consumableItems,
    updateConsumable,
    deleteConsumable,
  } = useConsumables(characterUUID);

  const [createOpen, setCreateOpen] = useState(false);

  const renderEquipped = (p: GridRenderCellParams<Consumable>) => {
    return (
      <Box className="flex items-center h-full w-full justify-center">
        <Checkbox
          value={p.row.equipped}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateConsumable({
              uuid: p.row.uuid,
              equipped: !!event.target.value,
            });
          }}
        />
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
            <IconButton
              onClick={() => {
                updateConsumable({
                  uuid: p.row.uuid,
                  charges: (p.row.charges ?? 0) - 1,
                });
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body1">{p.row.charges}</Typography>
            <IconButton
              onClick={() => {
                updateConsumable({
                  uuid: p.row.uuid,
                  charges: (p.row.charges ?? 0) + 1,
                });
              }}
            >
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
      renderCell: (p) => {
        return (
          <Box className="flex items-center justify-end">
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteConsumable(p.row);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <React.Fragment>
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
        slotProps={{
          footer: {
            onClick: () => {
              setCreateOpen(true);
            },
          },
        }}
        pageSizeOptions={[10, 15, 20, 25, 50]}
        density="compact"
      />
      <CreateMagicItem
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        characterUUID={characterUUID}
      />
    </React.Fragment>
  );
}

export default ConsumableItemsGrid;

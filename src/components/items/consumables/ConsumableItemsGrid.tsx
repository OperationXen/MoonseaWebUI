"use client";

import React, { ChangeEvent, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import TextsmsIcon from "@mui/icons-material/Textsms";

import { Box, Checkbox, IconButton, Typography, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useConsumables } from "@/data/fetch/items/consumables";
import { getNumberEquipped } from "@/utils/items";
import useSnackbar from "@/datastore/snackbar";

import { ConsumableTypeWidget } from "../widgets/ConsumableTypeWidget";
import ConsumableItemsGridFooter from "./ConsumableItemsGridFooter";
import NoItemsOverlay from "../widgets/NoItemsOverlay";
import RarityWidget from "../widgets/RarityWidget";
import ConsumableDialog from "./ConsumableDialog";

import type { UUID } from "@/types/uuid";
import type { Consumable } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function ConsumableItemsGrid(props: PropsType) {
  const { characterUUID } = props;

  const { displayMessage } = useSnackbar();
  const {
    data: consumableItems,
    updateConsumable,
    deleteConsumable,
  } = useConsumables(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editConsumable, setEditConsumable] = useState<Consumable | null>(null);

  const renderEquipped = (p: GridRenderCellParams<Consumable>) => {
    return (
      <Box className="flex items-center h-full w-full justify-center">
        <Checkbox
          checked={p.row.equipped}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateConsumable({
              uuid: p.row.uuid,
              equipped: !!event.target.checked,
            });
          }}
        />
      </Box>
    );
  };

  const getRowActions = (p: GridRenderCellParams<Consumable>) => {
    //if (!p.row.editable) return null;

    return (
      <Box className="flex items-center justify-end">
        <IconButton onClick={() => setEditConsumable(p.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteConsumable(p.row).then(() =>
              displayMessage(`Removed ${p.row.name}`, "info"),
            );
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  const columns: GridColDef<Consumable>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 5,
    },
    {
      field: "description",
      flex: 1,
      headerName: "",
      renderCell: (p) => {
        return (
          <Box className="flex w-full items-center h-full justify-center">
            <Tooltip arrow placement="bottom" title={p.row.description}>
              <TextsmsIcon
                fontSize="small"
                className={p.row.description ? "" : "opacity-20"}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 2,
      renderCell: (p) => {
        return <ConsumableTypeWidget type={p.row.type} />;
      },
    },
    {
      field: "rarity",
      headerName: "Rarity",
      flex: 2,
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
      flex: 3,
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
      headerName: `Equipped ${getNumberEquipped(consumableItems)}`,
      flex: 2,
      renderCell: renderEquipped,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 130,
      headerAlign: "center",
      renderCell: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        autoPageSize
        getRowId={(x) => x.uuid}
        columns={columns}
        rows={consumableItems}
        initialState={{
          sorting: {
            sortModel: [{ field: "equipped", sort: "desc" }],
          },
          columns: {
            columnVisibilityModel: { description: true },
          },
        }}
        slots={{
          footer: ConsumableItemsGridFooter,
          noRowsOverlay: NoItemsOverlay as any,
        }}
        slotProps={{
          footer: {
            onClick: () => {
              setDialogOpen(true);
            },
          },
        }}
        density="compact"
      />
      <ConsumableDialog
        open={dialogOpen || !!editConsumable}
        onClose={() => {
          setDialogOpen(false);
          setEditConsumable(null);
        }}
        characterUUID={characterUUID}
        consumable={editConsumable}
      />
    </React.Fragment>
  );
}

export default ConsumableItemsGrid;

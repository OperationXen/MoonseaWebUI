"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DescriptionIcon from "@mui/icons-material/Description";

import { Box, Checkbox, IconButton, Button } from "@mui/material";
import { Tooltip, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import { useMagicItems } from "@/data/fetch/items/magicitems";
import { getNumberEquipped } from "@/utils/items";
import useSnackbar from "@/data/store/snackbar";

import NoItemsOverlay from "../widgets/NoItemsOverlay";
import ConfirmItemDelete from "../ConfirmItemDelete";
import RarityWidget from "../widgets/RarityWidget";
import MagicItemDialog from "../MagicItemDialog";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function CommonItemsGrid(props: PropsType) {
  const { characterUUID, editable } = props;

  const router = useRouter();
  const { displayMessage } = useSnackbar();
  const { data, updateItem, deleteItem } = useMagicItems(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editConsumable, setEditConsumable] = useState<MagicItem | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MagicItem>();

  // filter items down to just the common
  const magicItems = data?.filter((item: MagicItem) => {
    return item.rarity === "common";
  });

  const handleItemDelete = (item: MagicItem | undefined) => {
    if (!item) return;
    deleteItem(item).then(() => {
      displayMessage(`Removed ${item.name}`, "info");
      setDeleteConfirmItem(undefined);
    });
  };

  const renderEquipped = (p: GridRenderCellParams<MagicItem>) => {
    return (
      <Box className="flex items-center h-full w-full justify-center">
        <Checkbox
          checked={p.row.equipped}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateItem({
              uuid: p.row.uuid,
              equipped: !!event.target.checked,
            });
          }}
        />
      </Box>
    );
  };

  const getRowActions = (p: GridRenderCellParams<MagicItem>) => {
    if (!p.row.editable) return null;
    return (
      <Box className="flex items-center justify-end">
        <IconButton onClick={() => router.push(`/magicitem/${p.row.uuid}`)}>
          <DescriptionIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => setEditConsumable(p.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => setDeleteConfirmItem(p.row)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  const columns: GridColDef<MagicItem>[] = [
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
      field: "attunement",
      headerName: "Attunement",
      flex: 1,
      renderCell: (p) => {
        return (
          <Box className="flex items-center h-full">
            <Typography>{p.row.attunement ? "Required" : ""}</Typography>
          </Box>
        );
      },
    },
    {
      field: "equipped",
      headerName: `Equipped ${getNumberEquipped(magicItems)}`,
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
        rows={magicItems}
        onRowDoubleClick={(p) => router.push(`/magicitem/${p.row.uuid}`)}
        initialState={{
          sorting: {
            sortModel: [{ field: "equipped", sort: "desc" }],
          },
          columns: {
            columnVisibilityModel: { description: true },
          },
        }}
        slots={{
          footer: () => (
            <Box
              className="flex px-1 py-1 h-11 items-center"
              sx={{ borderTop: "1px solid black" }}
            >
              <Button
                disabled={!editable}
                sx={{ pointerEvents: "auto" }}
                variant="outlined"
                onClick={() => setDialogOpen(true)}
              >
                Add common item
              </Button>
              <GridPagination className="flex items-center justify-end no-scrollbar overflow-hidden" />
            </Box>
          ),
          noRowsOverlay: NoItemsOverlay as any,
        }}
        density="compact"
      />
      <MagicItemDialog
        open={dialogOpen || !!editConsumable}
        onClose={() => {
          setDialogOpen(false);
          setEditConsumable(null);
        }}
        characterUUID={characterUUID}
        item={editConsumable}
        defaultRarity="common"
      />
      <ConfirmItemDelete
        item={deleteConfirmItem}
        onClose={() => setDeleteConfirmItem(undefined)}
        onConfirm={() => handleItemDelete(deleteConfirmItem)}
      />
    </React.Fragment>
  );
}

export default CommonItemsGrid;

"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DescriptionIcon from "@mui/icons-material/Description";

import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useMagicItems } from "@/data/fetch/items/magicitems";
import { getNumberEquipped } from "@/utils/items";
import useSnackbar from "@/datastore/snackbar";

import CommonItemsGridFooter from "./CommonItemsGridFooter";
import NoItemsOverlay from "../widgets/NoItemsOverlay";
import RarityWidget from "../widgets/RarityWidget";
import MagicItemDialog from "../MagicItemDialog";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function CommonItemsGrid(props: PropsType) {
  const { characterUUID } = props;

  const router = useRouter();
  const { displayMessage } = useSnackbar();
  const { data, updateItem, deleteItem } = useMagicItems(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editConsumable, setEditConsumable] = useState<MagicItem | null>(null);

  // filter items down to just the common
  const magicItems = data?.filter((item: MagicItem) => {
    return item.rarity === "common";
  });

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
        <IconButton onClick={() => setEditConsumable(p.row)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => router.push(`/magicitem/${p.row.uuid}`)}>
          <DescriptionIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteItem(p.row).then(() =>
              displayMessage(`Removed ${p.row.name}`, "info"),
            );
          }}
        >
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
          footer: CommonItemsGridFooter,
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
    </React.Fragment>
  );
}

export default CommonItemsGrid;

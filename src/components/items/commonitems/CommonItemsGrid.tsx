"use client";

import React, { ChangeEvent, useState } from "react";

import { useRouter } from "next/navigation";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { Box, Checkbox, IconButton } from "@mui/material";
import { Button, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import { GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";

import { useMagicItems } from "@/data/fetch/items/magicitems";
import { getNumberEquipped } from "@/utils/items";
import useSnackbar from "@/data/store/snackbar";

import CreateAdvertDialog from "@/components/trade/CreateAdvertDialog";
import ItemMarketWidget from "../widgets/ItemMarketWidget";
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

export function MagicItemsGrid(props: PropsType) {
  const { characterUUID, editable } = props;

  const router = useRouter();
  const { displayMessage } = useSnackbar();
  const { data, updateItem, deleteItem, refreshItems } =
    useMagicItems(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [hideMarket, setHideMarket] = useState(true);
  const [editItem, setEditItem] = useState<MagicItem | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MagicItem>();
  const [advertItem, setAdvertItem] = useState<MagicItem>();

  // filter out uncommon+ items, and anything in the trading post
  const magicItems = data?.filter((item: MagicItem) => {
    if (item.market && hideMarket) return false;
    return ["common"].includes(item.rarity);
  });

  const getRowFormat = (p: GridRowParams) => {
    if (p.row.market) return "bg-gray-400 opacity-70";
    return "";
  };

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
        {(p.row.market && (
          <Tooltip
            title="This item is in the trading post, if you want to equip it you must first remove it from the trading post"
            placement="left"
          >
            <DisabledByDefaultIcon className="opacity-80" />
          </Tooltip>
        )) || (
          <Checkbox
            disabled={p.row.market}
            checked={p.row.equipped}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              updateItem({
                uuid: p.row.uuid,
                equipped: !!event.target.checked,
              });
            }}
          />
        )}
      </Box>
    );
  };

  const getRowActions = (p: GridRenderCellParams<MagicItem>) => {
    if (!p.row.editable) return null;
    return (
      <Box className="flex items-center justify-end">
        <ItemMarketWidget
          item={p.row}
          charUUID={characterUUID}
          onAdd={() => {
            setAdvertItem(p.row);
          }}
          onRemove={() => {}}
        />

        <IconButton onClick={() => router.push(`/magicitem/${p.row.uuid}`)}>
          <DescriptionIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={() => setEditItem(p.row)}>
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
      flex: 4,
      renderCell: (p) => {
        if (p.row.rp_name) {
          return (
            <Box className="flex w-full items-center h-full">
              <Typography>{`${p.row.rp_name} (${p.row.name})`}</Typography>
            </Box>
          );
        }
        return (
          <Box className="flex w-full items-center h-full">
            <Typography>{`${p.row.name}`}</Typography>
          </Box>
        );
      },
    },
    {
      field: "description",
      flex: 1,
      headerName: "",
      renderCell: (p) => {
        return (
          <Box className="flex w-full items-center h-full justify-center">
            <Tooltip arrow placement="bottom" title={p.row.description}>
              <DescriptionIcon
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
          <Box className="flex items-center h-full justify-center">
            <RarityWidget rarity={p.row.rarity} text />
          </Box>
        );
      },
    },
    {
      field: "attunement",
      headerName: `Attunement (${0})`,
      flex: 2,
      renderCell: (p) => {
        return (
          <Box className="flex items-center h-full justify-center">
            <Typography>{p.row.attunement ? "Required" : ""}</Typography>
          </Box>
        );
      },
    },
    {
      field: "equipped",
      headerName: `Equipped (${getNumberEquipped(magicItems)})`,
      flex: 2,
      renderCell: renderEquipped,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 160,
      headerAlign: "center",
      renderCell: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        autoPageSize
        getRowId={(x) => x.uuid}
        getRowClassName={getRowFormat}
        columns={columns}
        rows={magicItems}
        onRowDoubleClick={(p) => {
          router.push(`/magicitem/${p.row.uuid}`);
        }}
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
              className="flex px-1 h-11 items-center justify-between"
              sx={{ borderTop: "1px solid black" }}
            >
              <Box>
                <Button
                  sx={{ pointerEvents: "auto" }}
                  disabled={!editable}
                  variant="outlined"
                  onClick={() => setDialogOpen(true)}
                >
                  Add common item
                </Button>
                <Checkbox
                  className="ml-4"
                  checked={hideMarket}
                  onChange={() => setHideMarket(!hideMarket)}
                />
                <Typography className="opacity-70" variant="caption">
                  Hide items in trading post
                </Typography>
              </Box>
              <GridPagination className="flex items-center justify-end no-scrollbar overflow-hidden" />
            </Box>
          ),
          noRowsOverlay: NoItemsOverlay as any,
        }}
        slotProps={{
          noRowsOverlay: {
            additional: "By default items in the trading post are not shown",
          } as any,
        }}
        density="compact"
      />
      <MagicItemDialog
        open={dialogOpen || !!editItem}
        onClose={() => {
          setDialogOpen(false);
          setEditItem(null);
        }}
        characterUUID={characterUUID}
        item={editItem}
        defaultRarity="common"
      />
      <ConfirmItemDelete
        item={deleteConfirmItem}
        onClose={() => setDeleteConfirmItem(undefined)}
        onConfirm={() => handleItemDelete(deleteConfirmItem)}
      />
      <CreateAdvertDialog
        item={advertItem}
        onCreate={() => refreshItems()}
        onClose={() => setAdvertItem(undefined)}
        open={!!advertItem}
      />
    </React.Fragment>
  );
}

export default MagicItemsGrid;

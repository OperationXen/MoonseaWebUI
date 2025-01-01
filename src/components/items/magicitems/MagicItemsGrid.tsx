"use client";

import React, { ChangeEvent, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useMagicItems } from "@/data/fetch/items/magicitems";
import { getNumberEquipped } from "@/utils/items";
import useSnackbar from "@/datastore/snackbar";

import ItemMarketWidget from "../widgets/ItemMarketWidget";
import MagicItemsGridFooter from "./MagicItemsGridFooter";
import NoItemsOverlay from "../widgets/NoItemsOverlay";
import RarityWidget from "../widgets/RarityWidget";
import MagicItemDialog from "../MagicItemDialog";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function MagicItemsGrid(props: PropsType) {
  const { characterUUID } = props;

  const { displayMessage } = useSnackbar();
  const { data, updateItem, deleteItem } = useMagicItems(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [hideMarket, setHideMarket] = useState(true);
  const [editItem, setEditItem] = useState<MagicItem | null>(null);

  // filter out common items, and anything in the trading post
  const magicItems = data?.filter((item: MagicItem) => {
    if (item.market && hideMarket) return false;
    return ["uncommon", "rare", "veryrare", "legendary"].includes(item.rarity);
  });

  const renderEquipped = (p: GridRenderCellParams<MagicItem>) => {
    return (
      <Box className="flex items-center h-full w-full justify-center">
        {(p.row.market && (
          <Tooltip title="This item is in the trading post, if you want to equip it you must first remove it from the trading post">
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

  const columns: GridColDef<MagicItem>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 4,
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
      field: "market",
      headerName: "Trade",
      flex: 1,
      renderCell: (p) => {
        return <ItemMarketWidget item={p.row} />;
      },
    },
    {
      field: "Item edit controls",
      headerName: "",
      renderCell: (p) => {
        return (
          <Box className="flex items-center justify-end">
            <IconButton onClick={() => setEditItem(p.row)}>
              <EditIcon fontSize="small" />
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
      },
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        getRowId={(x) => x.uuid}
        columns={columns}
        rows={magicItems}
        initialState={{
          sorting: {
            sortModel: [{ field: "equipped", sort: "desc" }],
          },
          columns: {
            columnVisibilityModel: { description: true },
          },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          footer: MagicItemsGridFooter as any,
          noRowsOverlay: NoItemsOverlay as any,
        }}
        slotProps={{
          footer: {
            onClick: () => {
              setDialogOpen(true);
            },
            hideMarket,
            setHideMarket,
          } as any,
          noRowsOverlay: {
            additional: "By default items in the trading post are not shown",
          } as any,
        }}
        pageSizeOptions={[10, 15, 20, 25, 50]}
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
        defaultRarity="uncommon"
      />
    </React.Fragment>
  );
}

export default MagicItemsGrid;

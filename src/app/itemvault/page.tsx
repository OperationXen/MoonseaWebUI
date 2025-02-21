"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ErrorBoundary } from "react-error-boundary";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams as GRCellParams } from "@mui/x-data-grid";
import { Box, Paper, Dialog, IconButton, Tooltip } from "@mui/material";
import { TextField, Typography, InputAdornment } from "@mui/material";

import AuthenticationRequired from "@/components/user/AuthenticationRequired";
import CreateAdvertDialog from "@/components/trade/CreateAdvertDialog";
import { useUserMagicItems } from "@/data/fetch/items/usermagicitems";
import RarityWidget from "@/components/items/widgets/RarityWidget";
import CharacterLinkWidget from "./widgets/CharacterLinkWidget";
import { getDateString, getSourceText } from "@/utils/format";
import ItemLinkWidget from "./widgets/ItemLinkWidget";
import { raritySortComparitor } from "@/utils/sort";

import type { MagicItem } from "types/items";

export default function ItemVault() {
  const router = useRouter();
  const { data: items, isLoading } = useUserMagicItems();

  const [createOpen, setCreateOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);
  const [item, setItem] = useState<MagicItem | null>(null);

  const getFilteredItems = (): MagicItem[] => {
    if (!items) return [];

    const filtered = items.filter((x) =>
      x.name.toLowerCase().includes(filter.toLowerCase()),
    );
    return filtered;
  };

  const rowDate = (item: MagicItem | undefined) => {
    try {
      if (!item) {
        return "";
      }

      let datetime = new Date(item.datetime_obtained);
      return getDateString(datetime);
    } catch (_error) {
      console.error(_error);
      return "";
    }
  };

  const rowSourceText = (item: MagicItem | undefined) => {
    try {
      if (item?.source_event_type) return getSourceText(item.source_event_type);
      return "";
    } catch (_error) {
      console.error(_error);
      return "";
    }
  };
  const rowStatusText = (_: boolean, item: MagicItem | undefined) => {
    try {
      if (item?.market) return "In trading post";
      if (item?.equipped) return "Equipped";
      return "Unused";
    } catch (_error) {
      console.error(_error);
      return "";
    }
  };

  const handleTrade = (item: MagicItem) => {
    setItem(item);
    setShowAdvertCreate(true);
  };

  const getRowActions = (params: any) => {
    if (params.row.market) {
      return [
        <Tooltip title="View in trading post" placement="right">
          <IconButton onClick={() => router.push("/tradingpost/items/")}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>,
      ];
    } else {
      return [
        <Tooltip title="Send to trading post" placement="right">
          <IconButton onClick={() => handleTrade(params.row)}>
            <LocalGroceryStoreIcon />
          </IconButton>
        </Tooltip>,
      ];
    }
  };

  const columns: GridColDef[] = [
    {
      field: "datetime_obtained",
      headerName: "Date obtained",
      flex: 0.1,
      valueGetter: rowDate,
    },
    {
      field: "rarity",
      headerName: "Rarity",
      align: "center",
      sortComparator: raritySortComparitor,
      renderCell: (p: GRCellParams) => (
        <Box className="flex justify-center items-center h-full">
          <RarityWidget rarity={p.row.rarity} />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Item",
      flex: 0.25,
      renderCell: (p: GRCellParams) => (
        <Box className="flex justify-start items-center h-full">
          <ItemLinkWidget name={p.row.name} uuid={p.row.uuid} />
        </Box>
      ),
    },
    {
      field: "owner_name",
      headerName: "Owner",
      flex: 0.15,
      renderCell: (p: GRCellParams) => (
        <Box className="flex justify-start items-center h-full">
          <CharacterLinkWidget
            name={p.row.owner_name}
            uuid={p.row.owner_uuid}
          />
        </Box>
      ),
    },
    {
      field: "source_event_type",
      headerName: "Source",
      flex: 0.2,
      valueGetter: rowSourceText,
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      flex: 0.1,
      valueGetter: rowStatusText,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: getRowActions,
    },
  ];

  return (
    <AuthenticationRequired>
      <Paper className="flex flex-col flex-grow px-2 pb-2 m-2">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="mt-2 mb-1"
        >
          <Typography variant="h5">Item Vault</Typography>
          <TextField
            label="Search my items"
            size="small"
            className="basis-1/2 min-w-96"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <ErrorBoundary fallback="Error!">
          <Box className="flex-grow">
            <DataGrid
              getRowId={(r) => r.uuid}
              columns={columns}
              rows={getFilteredItems()}
              density="compact"
              loading={isLoading}
              pageSizeOptions={[10, 20, 50, 100]}
              initialState={{
                pagination: { paginationModel: { pageSize: 20 } }, // Setting initial pageSize
                sorting: {
                  sortModel: [{ field: "status", sort: "asc" }],
                },
              }}
              sx={{
                border: "1px solid black",
                minHeight: "calc(100vh - 9em)",
              }}
            />
          </Box>
        </ErrorBoundary>
        <ErrorBoundary fallback="Error in dialogs">
          <Dialog
            open={createOpen}
            onClose={() => {
              setCreateOpen(false);
            }}
          />
          {item && (
            <CreateAdvertDialog
              open={showAdvertCreate}
              onClose={() => setShowAdvertCreate(false)}
              item={item}
            />
          )}
        </ErrorBoundary>
      </Paper>
    </AuthenticationRequired>
  );
}

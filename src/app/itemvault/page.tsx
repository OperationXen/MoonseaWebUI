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

    return items.filter((x) =>
      x.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const rowDate = (item: MagicItem) => {
    try {
      let datetime = new Date(item.datetime_obtained);
      return getDateString(datetime);
    } catch (_error) {
      console.error(_error);
      return "";
    }
  };

  const rowSourceText = (item: MagicItem) => {
    try {
      if (item.source_event_type) return getSourceText(item.source_event_type);
      return "";
    } catch (_error) {
      console.error(_error);
      return "";
    }
  };
  const rowStatusText = (item: MagicItem) => {
    try {
      if (item.market) return "In trading post";
      if (item.equipped) return "Equipped";
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
      renderCell: (p: GRCellParams) => <RarityWidget rarity={p.row.rarity} />,
    },
    {
      field: "name",
      headerName: "Item",
      flex: 0.25,
      renderCell: (p: GRCellParams) => (
        <ItemLinkWidget name={p.row.name} uuid={p.row.uuid} />
      ),
    },
    {
      field: "owner_name",
      headerName: "Owner",
      flex: 0.15,
      renderCell: (p: GRCellParams) => (
        <CharacterLinkWidget name={p.row.owner_name} uuid={p.row.owner_uuid} />
      ),
    },
    {
      field: "source_event_type",
      headerName: "Source",
      flex: 0.2,
      valueGetter: rowSourceText,
    },
    {
      field: "market",
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
      <Paper className="flex flex-col flex-grow p-2 m-4">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          margin="0.5em 0"
        >
          <Typography variant="h4">Item Vault</Typography>
          <TextField
            label="Search my items"
            variant="standard"
            sx={{ width: "25em" }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
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
              }}
              sx={{
                border: "1px solid black",
                minHeight: "calc(100vh - 12em)",
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

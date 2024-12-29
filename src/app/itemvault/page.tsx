"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams as GRCellParams } from "@mui/x-data-grid";
import { Box, Paper, Dialog, IconButton, Tooltip } from "@mui/material";
import { TextField, Typography, InputAdornment } from "@mui/material";

import { useMagicItems } from "@/data/fetch/items/magicitems";
import { getDateString, getSourceText } from "@/utils/format";
import CreateAdvertDialog from "@/components/trade/CreateAdvertDialog";
import RarityWidget from "@/components/items/widgets/RarityWidget";
import CharacterLinkWidget from "./widgets/CharacterLinkWidget";
import ItemLinkWidget from "./widgets/ItemLinkWidget";

import type { MagicItem } from "types/items";

export default function ItemVault() {
  const router = useRouter();
  const { data: items, isLoading } = useMagicItems();

  const [createOpen, setCreateOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);
  const [item, setItem] = useState<MagicItem | null>(null);

  const getFilteredItems = () => {
    return items?.filter((x) =>
      x.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const rowDate = (value: MagicItem) => {
    let datetime = new Date(value.datetime_obtained);
    return getDateString(datetime);
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
      valueGetter: (p: MagicItem) => getSourceText(p.source_event_type),
    },
    {
      field: "market",
      headerName: "Status",
      align: "center",
      flex: 0.1,
      valueGetter: (p: MagicItem) => {
        p.market ? "In trade post" : p.equipped ? "Equipped" : "Unused";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: getRowActions,
    },
  ];

  return (
    <Paper
      className="flex flex-col flex-grow p-2 m-4"
      sx={{ height: "calc(100vh - 5em)" }}
    >
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

      <Box className="flex-grow">
        <DataGrid
          getRowId={(r) => r.uuid}
          columns={columns}
          rows={getFilteredItems()}
          density="compact"
          loading={isLoading}
          sx={{
            border: "1px solid black",
          }}
        />
      </Box>

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
    </Paper>
  );
}

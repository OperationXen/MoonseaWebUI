"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { GridRenderCellParams as GRCellParams } from "@mui/x-data-grid";
import { Box, Container, Dialog, IconButton, Tooltip } from "@mui/material";
import { TextField, Typography, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import useSnackbar from "@/datastore/snackbar";
import { getUserMagicItems } from "@/api/items";
import { getDateString, getSourceText } from "@/utils/format";
import CharacterLinkWidget from "./widgets/CharacterLinkWidget";
import ItemLinkWidget from "./widgets/ItemLinkWidget";
import RarityWidget from "@/components/items/widgets/RarityWidget";
import CreateAdvertDialog from "../../components/trade/CreateAdvertDialog";

import type { MagicItem } from "types/items";

export default function ItemVault() {
  const router = useRouter();
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
  const [items, setItems] = useState<MagicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);
  const [item, setItem] = useState<MagicItem | null>(null);

  useEffect(() => {
    getUserMagicItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        snackbar("Unable to fetch your items", "error");
      })
      .finally(() => setLoading(false));
  }, [snackbar]);

  const getFilteredItems = () => {
    return items.filter((x) =>
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
    <Container
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100vh - 4em)",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
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

      <DataGrid
        getRowId={(r) => r.uuid}
        columns={columns}
        rows={getFilteredItems()}
        rowHeight={36}
        loading={loading}
        sx={{
          border: "1px solid black",
        }}
      />

      <Dialog
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      />
      <CreateAdvertDialog
        open={showAdvertCreate}
        onClose={() => setShowAdvertCreate(false)}
        {...item}
      />
    </Container>
  );
}

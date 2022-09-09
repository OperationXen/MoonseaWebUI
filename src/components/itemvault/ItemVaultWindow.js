import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Container, Dialog, Tooltip } from "@mui/material";
import { TextField, Typography, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import useSnackbar from "../../datastore/snackbar";
import { getUserMagicItems } from "../../api/items";
import { getDateString, getSourceText } from "../../utils/format";
import CharacterLinkWidget from "./widgets/CharacterLinkWidget";
import ItemLinkWidget from "./widgets/ItemLinkWidget";
import RarityWidget from "../items/widgets/RarityWidget";
import CreateAdvertDialog from "../trading/CreateAdvertDialog";

export default function ItemVaultWindow(props) {
  const snackbar = useSnackbar((s) => s.displayMessage);
  const navigate = useNavigate();

  const [createOpen, setCreateOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [showAdvertCreate, setShowAdvertCreate] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    getUserMagicItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        snackbar("Unable to fetch your items", "error");
      })
      .finally(() => setLoading(false));
  }, [snackbar]);

  const getFilteredItems = () => {
    return items.filter((x) =>
      x.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const handleTrade = (item) => {
    setItem(item);
    setShowAdvertCreate(true);
  };

  const rowDate = (params) => {
    let datetime = new Date(params.row.datetime_obtained);
    return getDateString(datetime);
  };
  const getRowRarityWidget = (params) => {
    return <RarityWidget rarity={params.row.rarity} />;
  };
  const getRowCharacterLinkWidget = (params) => {
    return (
      <CharacterLinkWidget
        name={params.row.owner_name}
        uuid={params.row.owner_uuid}
      />
    );
  };
  const getRowItemLinkWidget = (params) => {
    return <ItemLinkWidget name={params.row.name} uuid={params.row.uuid} />;
  };
  const getRowActions = (params) => {
    if (params.row.market) {
      return [
        <Tooltip title="View in trading post" placement="right">
          <GridActionsCellItem
            icon={<ExitToAppIcon />}
            onClick={() => navigate("/tradingpost/items/")}
          />
        </Tooltip>,
      ];
    } else {
      return [
        <Tooltip title="Send to trading post" placement="right">
          <GridActionsCellItem
            icon={<LocalGroceryStoreIcon />}
            onClick={() => handleTrade(params.row)}
          />
        </Tooltip>,
      ];
    }
  };

  const columns = [
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
      renderCell: getRowRarityWidget,
    },
    {
      field: "name",
      headerName: "Item",
      flex: 0.25,
      renderCell: getRowItemLinkWidget,
    },
    {
      field: "owner_name",
      headerName: "Owner",
      flex: 0.15,
      renderCell: getRowCharacterLinkWidget,
    },
    {
      field: "source_event_type",
      headerName: "Source",
      flex: 0.2,
      valueGetter: (p) => getSourceText(p.row.source_event_type),
    },
    {
      field: "market",
      headerName: "Status",
      align: "center",
      flex: 0.1,
      valueGetter: (p) =>
        p.row.market ? "In trade post" : p.row.equipped ? "Equipped" : "Unused",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: getRowActions,
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        padding: "0.5em",
        height: "calc(100% - 2.5em)",
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
      <Box sx={{ flexGrow: 1 }}>
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
      </Box>
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

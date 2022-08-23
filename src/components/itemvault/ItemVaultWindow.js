import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Container, Dialog } from "@mui/material";
import { TextField, Typography, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import useSnackbar from "../../datastore/snackbar";
import { getUserMagicItems } from "../../api/items";

export default function ItemVaultWindow(props) {
  const snackbar = useSnackbar((s) => s.displayMessage);
  const [createOpen, setCreateOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getUserMagicItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        snackbar("Unable to fetch your items", "error");
      });
  }, []);

  const columns = [
    { field: "col1", headerName: "Item", flex: 0.25 },
    { field: "col2", headerName: "Date obtained", flex: 0.1 },
    { field: "col3", headerName: "Owner", flex: 0.15 },
    { field: "col4", headerName: "Source", flex: 0.2 },
    { field: "col5", headerName: "Details", flex: 0.2 },
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
          columns={columns}
          rows={items}
          rowHeight={36}
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
    </Container>
  );
}

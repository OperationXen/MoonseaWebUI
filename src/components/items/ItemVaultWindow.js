import { useEffect, useState } from "react";

import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { Box, Container, Dialog } from "@mui/material";
import { Button, TextField, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function ItemVaultWindow(props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 3,
      col1: "Boots of Elvenkind",
      col2: "2022/05/19",
      col3: "Meepo",
      col4: "DM Service Reward",
      col5: "",
    },
    {
      id: 1,
      col1: "Hand of Vecna",
      col2: "2022/05/17",
      col3: "Meepo",
      col4: "Game (DDAL0101-A)",
      col5: "",
    },
    {
      id: 2,
      col1: "Cube of Force",
      col2: "2022/05/04",
      col3: "Meepo",
      col4: "Trade",
      col5: "",
    },
  ]);

  const columns = [
    { field: "col1", headerName: "Item", flex: 0.25 },
    { field: "col2", headerName: "Date obtained", flex: 0.1 },
    { field: "col3", headerName: "Owner", flex: 0.15 },
    { field: "col4", headerName: "Source", flex: 0.2 },
    { field: "col5", headerName: "Details", flex: 0.2 },
  ];

  useEffect(() => {
    if (false) setItems([]);
  }, []);

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
          components={{
            Footer: () => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid black",
                }}
              >
                <div style={{ alignSelf: "center", marginLeft: "0.4em" }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setCreateOpen(true)}
                  >
                    Create New Item
                  </Button>
                </div>
                <GridPagination
                  style={{ justifySelf: "center", alignSelf: "center" }}
                />
              </div>
            ),
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

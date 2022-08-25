import React from "react";

import { Typography } from "@mui/material";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";

const columns = [
  {
    field: "datetime_obtained",
    headerName: "Date obtained",
    flex: 0.1,
  },
  {
    field: "rarity",
    headerName: "Rarity",
    align: "center",
  },
];

export default function TradingPostOffers(props) {
  return (
    <Grid container sx={{ margin: "0.4em", height: "100%" }} spacing={2}>
      <Grid xs={12} lg={6}>
        <Typography sx={{ height: "2em" }}>My offers</Typography>
        <DataGrid
          rows={[]}
          columns={columns}
          sx={{ height: "calc(100% - 3em)" }}
          components={{
            NoRowsOverlay: () => (
              <GridOverlay>
                <Typography sx={{ opacity: "0.6" }}>
                  No pending offers
                </Typography>
              </GridOverlay>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} lg={6}>
        <Typography sx={{ height: "2em" }}>Proposed trades</Typography>
        <DataGrid
          rows={[]}
          columns={columns}
          sx={{ height: "calc(100% - 3em)" }}
          components={{
            NoRowsOverlay: () => (
              <GridOverlay>
                <Typography sx={{ opacity: "0.6" }}>
                  No trades proposed
                </Typography>
              </GridOverlay>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

import React from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export default function MagicItemHistoryPane(props) {
  const { events } = props;

  // format the date information
  const rowDate = (params) => {
    return params.row.datetime.slice(0, 10).replaceAll("-", " / ");
  };

  const columns = [
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
      valueGetter: rowDate,
    },
    { field: "event-type", headerName: "Event Type", flex: 0.3 },
    { field: "detail", headerName: "Details", flex: 0.4 },
  ];

  return (
    <Box height="100%" width="100%">
      <DataGrid
        getRowId={(r) => r.uuid}
        disableColumnMenu
        columns={columns}
        rows={events}
        rowHeight={36}
        rowsPerPageOptions={[15, 25, 50, 100]}
        sx={{
          border: "1px solid black",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px grey",
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
      />
    </Box>
  );
}

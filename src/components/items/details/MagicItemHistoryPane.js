import React from "react";

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
      flex: 0.15,
      headerAlign: "left",
      align: "left",
      valueGetter: rowDate,
    },
  ];

  return (
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
  );
}

import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

import { getMagicItemHistory } from "../../../api/items";

export default function MagicItemHistoryPane(props) {
  const { uuid } = props;

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!uuid) return;

    getMagicItemHistory(uuid)
      .then((r) => {
        let allEvents = [r.data.origin];
        allEvents = allEvents.concat(r.data.trades);
        setEvents(allEvents);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  // format the date information
  const rowDate = (params) => {
    if (params.row.datetime) {
      return params.row.datetime.slice(0, 10).replaceAll("-", " / ");
    }
    return "No date information";
  };
  const formatEventType = (params) => {
    let data = params.row;

    if (data.event_type === "trade") return "Item traded";
    else if (data.event_type === "manual") return "Manually created";
    else if (data.event_type === "game") return "Found on adventure";
    else if (data.event_type === "dmreward") return "DM Reward";
    return "Divine intervention";
  };
  const formatDetails = (params) => {
    let data = params.row;

    if (data.event_type === "manual") {
      return `For character: ${data.character_name}`;
    } else if (data.event_type === "trade") {
      return `${data.exchanged_item ?? "Unknown item"} / ${data.sender_name}`;
    } else if (data.event_type === "game") {
      return `${data.name} (${data.dm_name})`;
    } else if (data.event_type === "dm_reward") {
      return `${data.name}`;
    }
  };

  const columns = [
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.25,
      valueGetter: rowDate,
    },
    {
      field: "event_type",
      headerName: "Event Type",
      flex: 0.3,
      valueGetter: formatEventType,
    },
    {
      field: "detail",
      headerName: "Details",
      flex: 0.5,
      valueGetter: formatDetails,
    },
  ];

  return (
    <Box height="100%" width="100%">
      <DataGrid
        getRowId={(r) => r.uuid}
        disableColumnMenu
        columns={columns}
        rows={events}
        loading={loading}
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

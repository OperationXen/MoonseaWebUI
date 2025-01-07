import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { getMagicItemHistory } from "@/api/items";
import useMagicItemStore from "@/datastore/magicitem";

import type { UUID } from "@/types/uuid";
import type { ItemEvent } from "@/types/events";

type PropsType = {
  uuid: UUID;
};

export default function MagicItemHistoryPane(props: PropsType) {
  const { uuid } = props;

  const refresh = useMagicItemStore((s) => s.refresh);

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<ItemEvent[]>([]);

  useEffect(() => {
    if (!uuid) return;

    getMagicItemHistory(uuid)
      .then((r) => {
        let allEvents = [r.data.origin];
        allEvents = allEvents.concat(r.data.trades);
        allEvents = allEvents.concat(r.data.edits);
        setEvents(allEvents);
      })
      .finally(() => setLoading(false));
  }, [uuid, refresh]);

  // format the date information
  const rowDate = (data: ItemEvent) => {
    if (data.datetime) {
      return data.datetime.slice(0, 10).replaceAll("-", " / ");
    }
    return "No date information";
  };

  const formatEventType = (data: ItemEvent) => {
    if (!data) return "";

    if (data.event_type === "trade") return "Item traded";
    else if (data.event_type === "manual") return "Manually created";
    else if (data.event_type === "edit") return data.name;
    else if (data.event_type === "game") return "Found on adventure";
    else if (data.event_type === "dm_reward") return "DM Reward";
    return "Divine intervention";
  };

  const formatDetails = (data: ItemEvent) => {
    if (!data) return "";

    if (data.event_type === "manual") {
      return `For character: ${data.character_name}`;
    } else if (data.event_type === "edit") {
      return `${data.details}`;
    } else if (data.event_type === "trade") {
      return `${data.exchanged_item ?? "Unknown item"} from ${data.recipient_name}`;
    } else if (data.event_type === "game") {
      return `${data.name} (${data.dm_name})`;
    } else if (data.event_type === "dm_reward") {
      return `${data.name}`;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.25,
      valueFormatter: rowDate,
    },
    {
      field: "event_type",
      headerName: "Event Type",
      flex: 0.3,
      valueFormatter: formatEventType,
    },
    {
      field: "detail",
      headerName: "Details",
      flex: 0.5,
      valueFormatter: formatDetails,
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
        pageSizeOptions={[15, 25, 50, 100]}
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

"use client";

import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";

import useSnackbar from "@/data/store/snackbar";
import { getDateString } from "@/utils/format";
import { useDMEvents } from "@/data/fetch/events/dmEvents";
import { useDMRewards } from "@/data/fetch/events/dmRewards";
import { useDMGames } from "@/data/fetch/events/dmGames";

import DMGameModal from "./DMGameModal";

import type {
  DMGameEvent,
  DMEvent,
  DMEventType,
  DMRewardEvent,
} from "@/types/events";
import type { UUID } from "@/types/uuid";

type PropsType = {
  uuid: UUID;
  allowUpdates: boolean;
};

export function DMEventsGrid(props: PropsType) {
  const { uuid, allowUpdates } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data: allDMEvents, refresh: refreshDMEvents } = useDMEvents(uuid);
  const { deleteReward } = useDMRewards(uuid);
  const { deleteGame } = useDMGames(uuid);

  const [createEditOpen, setCreateEditOpen] = useState(false);
  const [initialGameData, setInitialGameData] = useState<DMGameEvent | null>();

  const editItem = (event: DMEvent) => {
    if (event.event_type === "game") {
      setInitialGameData(event as DMGameEvent);
      setCreateEditOpen(true);
    }
  };

  const deleteItem = (event: DMEvent) => {
    if (event.event_type === "game") {
      deleteGame(event as DMGameEvent).then(() => {
        displayMessage("Removed DMed game", "info");
        refreshDMEvents();
      });
    } else if (event.event_type === "dm_reward") {
      deleteReward(event as DMRewardEvent).then(() => {
        displayMessage("Removed service reward", "info");
        refreshDMEvents();
      });
    }
  };

  const getRowActions = (p: GridRowParams) => {
    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        disabled={!allowUpdates}
        onClick={() => editItem(p.row)}
        label="Edit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        disabled={!allowUpdates}
        onClick={() => deleteItem(p.row)}
        label="Delete"
      />,
    ];
  };

  const rowType = (_val: DMEventType, event: DMEvent) => {
    if (event.event_type === "game") return "DMed game";
    if (event.event_type === "dm_reward") return "Service reward";
  };
  const rowDate = (val: string) => {
    let datetime = new Date(val);
    return getDateString(datetime);
  };
  const rowHours = (hours: number, event: DMEvent) => {
    if (event.event_type === "game") return hours;
    if (event.event_type === "dm_reward") return -hours;
    return "Error";
  };
  const rowDetails = (_val: string, event: DMEvent) => {
    if (event.event_type === "game") {
      event = event as DMGameEvent;
      return `${event.name} (${event.module})`;
    }
    if (event.event_type === "dm_reward") {
      event = event as DMRewardEvent;
      return `${event.name} given to ${event.character_items_assigned}`;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Event",
      flex: 0.15,
      headerAlign: "left",
      align: "left",
      valueGetter: rowType,
    },
    {
      field: "hours",
      headerName: "Service Hours",
      flex: 0.15,
      headerAlign: "left",
      align: "left",
      valueGetter: rowHours,
    },
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.15,
      headerAlign: "left",

      valueGetter: rowDate,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 0.6,
      headerAlign: "left",
      align: "left",
      valueGetter: rowDetails,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      getActions: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        disableColumnMenu
        columns={columns}
        rows={allDMEvents}
        rowHeight={36}
        sx={{ border: "1px solid black", borderRadius: "8px" }}
        getRowId={(row) => row.uuid}
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        slots={{
          footer: () => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid black",
              }}
            >
              <div
                style={{
                  alignSelf: "center",
                  marginLeft: "0.4em",
                }}
              >
                <Button
                  disabled={!allowUpdates}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setInitialGameData(null);
                    setCreateEditOpen(true);
                  }}
                >
                  Add Game
                </Button>
              </div>
              <GridPagination
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                }}
              />
            </div>
          ),
        }}
      />
      <DMGameModal
        open={createEditOpen}
        data={initialGameData ?? null}
        onClose={() => setCreateEditOpen(false)}
      />
    </React.Fragment>
  );
}

export default DMEventsGrid;

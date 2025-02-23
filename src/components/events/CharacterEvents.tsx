import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Box, Paper, Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useEvents } from "@/data/fetch/events/character";
import useSnackbar from "@/datastore/snackbar.js";
import CreateCharacterEvent from "./CreateCharacterEvent";
import { EventViewModal } from "./details/EventViewModal";
import { getDateString } from "@/utils/format";
import { getEventTypeName } from "@/utils/events";
import ConfirmEventDelete from "./ConfirmEventDelete";
import EditEvent from "./EditEvent";

import type { UUID } from "@/types/uuid";
import type { AnyEvent, EventType } from "@/types/events";

type PropsType = {
  characterUUID: UUID;
  characterName: string;
  downtime: number;
  editable: boolean;
};

export default function CharacterEvents(props: PropsType) {
  const { characterUUID, characterName, downtime, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data: events, deleteEvent } = useEvents(characterUUID);

  const [createOpen, setCreateOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<AnyEvent | null>(null); // event visible in modal window
  const [deleteConfirmEvent, setDeleteConfirmEvent] = useState<AnyEvent>();
  const [editEvent, setEditEvent] = useState<AnyEvent>();

  const handleOpenEventDetails = (data: any) => {
    setEventDetails(data.row);
  };

  const handleDeleteEvent = (event: AnyEvent | undefined) => {
    if (!event) return;
    setDeleteConfirmEvent(undefined);
    deleteEvent(event).then(() => {
      displayMessage(
        `${getEventTypeName(event.event_type)} event deleted`,
        "info",
      );
    });
  };

  const getRowActions = (params: GridRenderCellParams<AnyEvent>) => {
    if (!editable) return null;

    return (
      <Box>
        <IconButton
          onClick={() => {
            handleOpenEventDetails(params);
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          onClick={() => setEditEvent(params.row)}
          disabled={params.row.event_type !== "game"}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          disabled={params.row.event_type === "dm_reward"}
          onClick={() => {
            setDeleteConfirmEvent(params.row);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };
  const rowEventType = (_et: EventType, value: AnyEvent) => {
    return getEventTypeName(value.event_type);
  };
  const rowDate = (dt: string) => {
    return getDateString(new Date(dt));
  };

  const rowDetails = (_desc: string, value: AnyEvent) => {
    if (value.event_type === "game") {
      return `${value.name} (${value.module})`;
    } else if (value.event_type === "dm_reward") {
      let str = `${value.name}`;
      if (value.gold) {
        str += ` / ${value.gold} gold`;
      }
      if (value.downtime) {
        str += ` / ${value.downtime} downtime days`;
      }
      return str;
    } else if (value.event_type === "dt_catchingup") {
      return `${value.details ? value.details : "Gained a level"}`;
    } else if (value.event_type === "dt_mtrade") {
      return `${Math.abs(value.gold_change)}gp ${value.gold_change > 0 ? "received" : "spent"}`;
    } else if (value.event_type === "dt_sbookupd") {
      if (value.source)
        return `Copied spells to spellbook from ${value.source}`;
      return "Updated Spellbook";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "event_type",
      headerName: "Event Type",
      flex: 0.2,
      headerAlign: "left",
      align: "left",
      valueGetter: rowEventType,
    },
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.2,
      headerAlign: "left",
      align: "left",
      valueGetter: rowDate,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
      valueGetter: rowDetails,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 130,
      headerAlign: "center",
      renderCell: getRowActions,
    },
  ];

  return (
    <Paper
      sx={{
        minHeight: "520px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid
        disableColumnMenu
        getRowId={(r) => {
          return r.uuid;
        }}
        columns={columns}
        rows={events}
        onRowDoubleClick={handleOpenEventDetails}
        density="compact"
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
        slots={{
          footer: () => (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid black",
              }}
            >
              <Box
                style={{
                  alignSelf: "center",
                  marginLeft: "0.4em",
                }}
              >
                <Button
                  disabled={!editable}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add event
                </Button>
              </Box>
              <GridPagination />
            </Box>
          ),
        }}
      />
      <CreateCharacterEvent
        characterUUID={characterUUID}
        charName={characterName}
        downtime={downtime}
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      />
      <EventViewModal data={eventDetails} setData={setEventDetails} />
      <ConfirmEventDelete
        event={deleteConfirmEvent}
        onClose={() => setDeleteConfirmEvent(undefined)}
        onConfirm={() => handleDeleteEvent(deleteConfirmEvent)}
      />
      <EditEvent
        event={editEvent}
        characterUUID={characterUUID}
        onClose={() => setEditEvent(undefined)}
      />
    </Paper>
  );
}

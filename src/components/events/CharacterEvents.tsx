import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Paper, Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useEvents } from "@/data/fetch/events";

import { deleteEventMundaneTrade } from "@/api/events";
import {
  deleteEventCatchingUp,
  deleteEventSpellbookUpdate,
} from "@/api/events";
import { removeCharacterGame } from "@/api/events";

import useSnackbar from "@/datastore/snackbar.js";
import CreateCharacterEvent from "./CreateCharacterEvent";
import { EventViewModal } from "./details/EventViewModal";
import { getDateString, getEventName } from "@/utils/format";

import type { UUID } from "@/types/uuid";
import type { CharacterEvent, GameEvent, EventType } from "@/types/events";

type MSCEvent = CharacterEvent & GameEvent;

type PropsType = {
  characterUUID: UUID;
  characterName: string;
  downtime: number;
  editable: boolean;
};

export default function CharacterEvents(props: PropsType) {
  const { characterUUID, characterName, downtime, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data: events } = useEvents(characterUUID);

  const [createOpen, setCreateOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<CharacterEvent | null>(null); // event visible in modal window
  const [refresh, setRefresh] = useState(false);

  const handleOpenEventDetails = (data: any) => {
    setEventDetails(data.row);
  };

  const rowActions = (params: GridRenderCellParams<CharacterEvent>) => {
    if (!editable) return null;

    return (
      <React.Fragment>
        <IconButton
          onClick={() => {
            handleOpenEventDetails(params);
          }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton disabled>
          <EditIcon />
        </IconButton>
        <IconButton
          disabled={params.row.event_type === "dm_reward"}
          onClick={() => {
            if (params.row.event_type === "dt_catchingup") {
              deleteEventCatchingUp(params.row.uuid).then(() => {
                displayMessage("Event deleted", "info");
                setRefresh(!refresh);
              });
            } else if (params.row.event_type === "dt_mtrade") {
              deleteEventMundaneTrade(params.row.uuid).then(() => {
                displayMessage("Event deleted", "info");
                setRefresh(!refresh);
              });
            } else if (params.row.event_type === "dt_sbookupd") {
              deleteEventSpellbookUpdate(params.row.uuid).then(() => {
                displayMessage("Event deleted", "info");
                setRefresh(!refresh);
              });
            } else {
              removeCharacterGame(params.row.uuid, characterUUID).then(() => {
                displayMessage("Event deleted", "info");
                setRefresh(!refresh);
              });
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </React.Fragment>
    );
  };
  const rowEventType = (_et: EventType, value: CharacterEvent) => {
    return getEventName(value.event_type);
  };
  const rowDate = (_dt: Date, value: MSCEvent) => {
    if (value.datetime) return getDateString(value.datetime);
    else return "";
  };

  const rowDetails = (_desc: string, value: MSCEvent) => {
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
      flex: 0.2,
      align: "right",
      headerAlign: "center",
      type: "actions",
      renderCell: rowActions,
    },
  ];

  return (
    <Paper sx={{ minHeight: "600px" }}>
      <DataGrid
        disableColumnMenu
        getRowId={(r) => r.uuid}
        columns={columns}
        rows={events}
        onRowDoubleClick={handleOpenEventDetails}
        density="compact"
        sx={{
          height: "100%",
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
                  disabled={!editable}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add event
                </Button>
              </div>
              <GridPagination />
            </div>
          ),
        }}
      />
      <CreateCharacterEvent
        characterUUID={characterUUID}
        charName={characterName}
        downtime={downtime}
        open={createOpen}
        onClose={() => {
          setRefresh(!refresh);
          setCreateOpen(false);
        }}
      />
      <EventViewModal data={eventDetails} setData={setEventDetails} />
    </Paper>
  );
}

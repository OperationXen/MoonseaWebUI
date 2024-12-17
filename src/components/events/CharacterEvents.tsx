import React, { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { deleteEventMundaneTrade, getEventsForCharacter } from "@/api/events";
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
import type { CharacterEvent } from "@/types/events";

type PropsType = {
  characterUUID: UUID;
  characterName: string;
  downtime: number;
  editable: boolean;
};

export default function CharacterEvents(props: PropsType) {
  const { characterUUID, characterName, downtime, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<CharacterEvent | null>(null); // event visible in modal window
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getEventsForCharacter(characterUUID).then((result) => {
      setEvents(result.data);
    });
  }, [characterUUID, refresh]);

  const handleOpenEventDetails = (data: any) => {
    debugger;
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
  const rowEventType = (value: CharacterEvent) => {
    return getEventName(value.event_type);
  };
  const rowDate = (value: CharacterEvent) => {
    return getDateString(value.datetime);
  };

  const rowDetails = (value: CharacterEvent) => {
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
    <Box height="500px">
      <DataGrid
        disableColumnMenu
        getRowId={(r) => r.uuid}
        columns={columns}
        rows={events}
        rowHeight={36}
        onRowDoubleClick={handleOpenEventDetails}
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
        downtime={downtime}
        open={createOpen}
        onClose={() => {
          setRefresh(!refresh);
          setCreateOpen(false);
        }}
        name={characterName}
      />
      <EventViewModal data={eventDetails} setData={setEventDetails} />
    </Box>
  );
}

import React, { useState, useEffect } from "react";

import { Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteEventMundaneTrade, getEventsForCharacter } from "../../api/events";
import { deleteEventCatchingUp, deleteEventSpellbookUpdate } from "../../api/events";
import { removeCharacterGame } from "../../api/events";
import useSnackbar from "../../datastore/snackbar.js";
import CreateCharacterEvent from "./CreateCharacterEvent";
import { EventViewModal } from "./details/EventViewModal.js";
import { getDateString, getEventName } from "../../utils/format.js";

export default function CharacterEvents(props) {
  const { characterUUID, characterName, downtime, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null); // event visible in modal window
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getEventsForCharacter(characterUUID).then((result) => {
      setEvents(result.data);
    });
  }, [characterUUID, refresh]);

  const rowActions = (params) => {
    if (!editable) return null;

    return (
      <React.Fragment>
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
  const rowEventType = (params) => {
    let event_type = params.row.event_type;
    return getEventName(event_type);
  };
  const rowDate = (params) => {
    return getDateString(params.row.datetime);
  };

  const rowDetails = (params) => {
    let data = params.row;

    if (data.event_type === "game") {
      return `${data.name} (${data.module})`;
    } else if (data.event_type === "dm_reward") {
      let str = `${data.name}`;
      if (data.gold) {
        str += ` / ${data.gold} gold`;
      }
      if (data.downtime) {
        str += ` / ${data.downtime} downtime days`;
      }
      return str;
    } else if (data.event_type === "dt_catchingup") {
      return `${data.details ? data.details : "Gained a level"}`;
    } else if (data.event_type === "dt_mtrade") {
      return `${Math.abs(data.gold_change)}gp ${data.gold_change > 0 ? "received" : "spent"}`;
    } else if (data.event_type === "dt_sbookupd") {
      if (data.source) return `Copied spells to spellbook from ${data.source}`;
      return "Updated Spellbook";
    }
  };

  const handleDoubleClick = (data) => {
    setEventDetails(data.row);
  };

  const columns = [
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
    <React.Fragment>
      <DataGrid
        disableColumnMenu
        getRowId={(r) => r.uuid}
        columns={columns}
        rows={events}
        rowHeight={36}
        rowsPerPageOptions={[15, 25, 50, 100]}
        onRowDoubleClick={handleDoubleClick}
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
                  disabled={!editable}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add event
                </Button>
              </div>
              <GridPagination style={{ justifySelf: "center", alignSelf: "center" }} />
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
    </React.Fragment>
  );
}

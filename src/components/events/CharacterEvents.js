import React, { useState, useEffect } from "react";

import { Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteEventMundaneTrade,
  getEventsForCharacter,
} from "../../api/events";
import { deleteEventCatchingUp } from "../../api/events";
import { removeCharacterGame } from "../../api/events";
import useSnackbar from "../../datastore/snackbar.js";
import CreateCharacterEvent from "./CreateCharacterEvent";

export default function CharacterEvents(props) {
  const { characterUUID, characterName, downtime, editable } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
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
    );
  };
  const rowEventType = (params) => {
    let event_type = params.row.event_type;

    if (event_type === "game") {
      return "Game";
    } else if (event_type === "dm_reward") {
      return "DM Reward";
    } else if (event_type === "dt_catchingup") {
      return "Catching up";
    } else if (event_type === "dt_mtrade") {
      return "Merchant";
    }
  };
  const rowDate = (params) => {
    return params.row.datetime.slice(0, 10).replaceAll("-", " / ");
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
      return `${Math.abs(data.gold_change)}gp ${
        data.gold_change > 0 ? "received" : "spent"
      }`;
    }
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
              <GridPagination
                style={{ justifySelf: "center", alignSelf: "center" }}
              />
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
    </React.Fragment>
  );
}

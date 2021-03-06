import React, { useState, useEffect } from "react";

import { Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getEventsForCharacter,
  removeCharacterGame,
} from "../../api/events.js";
import useSnackbar from "../../datastore/snackbar.js";
import CreateCharacterEvent from "./CreateCharacterEvent";

export default function CharacterEvents(props) {
  const { characterUUID, characterName, editable } = props;
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
        onClick={() =>
          removeCharacterGame(params.row.uuid, characterUUID).then(() => {
            displayMessage("Event deleted", "info");
            setRefresh(!refresh);
          })
        }
      >
        <DeleteIcon />
      </IconButton>
    );
  };
  const rowEventType = (params) => {
    if (params.row.event_type === "game") {
      return "Game";
    }
  };
  const rowDate = (params) => {
    return params.row.datetime.slice(0, 10).replaceAll("-", " / ");
  };

  const rowDetails = (params) => {
    let data = params.row;
    if (data.event_type === "game") {
      return `${data.name} (${data.module})`;
    }
  };

  const columns = [
    {
      field: "event_type",
      headerName: "Event Type",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
      valueGetter: rowEventType,
    },
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.15,
      headerAlign: "center",
      align: "center",
      valueGetter: rowDate,
    },
    {
      field: "details",
      headerName: "Details",
      flex: 0.6,
      headerAlign: "center",
      align: "left",
      valueGetter: rowDetails,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      align: "right",
      headerAlign: "center",
      renderCell: rowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
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

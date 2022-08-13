import React from "react";
import { useState, useCallback, useLayoutEffect, useEffect } from "react";

import { Button, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import useSnackbar from "../../datastore/snackbar";
import { getDateString } from "../../utils/format";
import { getDMEvents, deleteDMGame, deleteDMReward } from "../../api/events.js";
import CreateDMGame from "./CreateDMGame.js";

export default function DMEvents(props) {
  const { dmUUID, onChange, allowUpdates } = props;
  const { doRefresh, setDoRefresh } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNum, setPageNum] = useState(1);

  const refreshDMEvents = useCallback(() => {
    getDMEvents(dmUUID).then((response) => {
      setEvents(response.data);
    });
  }, [dmUUID]);

  // fetch events on component initial load
  useLayoutEffect(() => {
    refreshDMEvents();
  }, [refreshDMEvents]);

  // allow parent to trigger a refresh (leaving state here for encapsulation)
  useEffect(() => {
    if (doRefresh) {
      refreshDMEvents();
      setDoRefresh(false);
    }
  }, [doRefresh, refreshDMEvents, setDoRefresh]);

  const onGameAdded = () => {
    refreshDMEvents();
    onChange();
  };

  const deleteItem = (type, uuid) => {
    if (type === "game") {
      deleteDMGame(uuid).then(() => {
        displayMessage("Removed DMed game", "info");
        onChange();
        refreshDMEvents();
      });
    } else if (type === "reward") {
      deleteDMReward(uuid).then(() => {
        displayMessage("Removed service reward", "info");
        onChange();
        refreshDMEvents();
      });
    }
  };

  const rowActions = (params) => {
    return (
      <IconButton
        disabled={!allowUpdates}
        onClick={() => deleteItem(params.row.event_type, params.row.uuid)}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const rowType = (params) => {
    if (params.row.event_type === "game") return "DMed game";
    if (params.row.event_type === "reward") return "Service reward";
  };
  const rowDate = (params) => {
    let datetime = new Date(params.row.datetime);
    return getDateString(datetime);
  };
  const rowHours = (params) => {
    if (params.row.event_type === "game") return params.row.hours;
    if (params.row.event_type === "reward") return -params.row.hours;
  };
  const rowDetails = (params) => {
    let data = params.row;
    if (data.event_type === "game") {
      return `${data.name} (${data.module})`;
    }
    if (data.event_type === "reward") {
      return `${data.name}`;
    }
  };

  const columns = [
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
      flex: 0.1,
      type: "actions",
      align: "right",
      headerAlign: "center",
      renderCell: rowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        disableColumnMenu
        columns={columns}
        rows={events}
        rowHeight={36}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[15, 25, 50, 100]}
        pageNum={pageNum}
        onPageChange={setPageNum}
        sx={{ border: "1px solid black", borderRadius: "8px" }}
        getRowId={(row) => row.uuid}
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
                  disabled={!allowUpdates}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add Game
                </Button>
              </div>
              <GridPagination
                style={{ justifySelf: "center", alignSelf: "center" }}
              />
            </div>
          ),
        }}
      />
      <CreateDMGame
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onAdd={onGameAdded}
      />
    </React.Fragment>
  );
}

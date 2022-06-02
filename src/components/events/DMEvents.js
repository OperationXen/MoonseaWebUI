import React, { useState, useEffect, useCallback } from "react";

import { Button, Dialog, IconButton } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import useSnackbar from "../../datastore/snackbar";
import { getDateString } from "../../utils/format";
import { getDMEvents, deleteDMEvent } from "../../api/events.js";
import CreateDMGame from "./CreateDMGame.js";

export default function DMEvents(props) {
  const { dmUUID } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [createOpen, setCreateOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNum, setPageNum] = useState(1);

  const refreshDMEvents = useCallback(() => {
    getDMEvents(dmUUID, pageSize, pageSize * (pageNum - 1)).then((response) => {
      setEvents(response.data.results);
    });
  }, [dmUUID, pageSize, pageNum]);

  const onGameAdded = () => {
    refreshDMEvents();
    setCreateOpen(false);
  };

  // fetch data on page changes
  useEffect(() => {
    refreshDMEvents();
  }, [refreshDMEvents, pageNum, pageSize]);

  const deleteGame = (uuid) => {
    deleteDMEvent(uuid);
  };

  const rowActions = (params) => {
    return (
      <IconButton
        onClick={() => {
          deleteGame(params.row.uuid).then(() => {
            displayMessage("Removed event", "info");
            refreshDMEvents();
          });
        }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  const rowType = (params) => {
    return "DMed game";
  };
  const rowDate = (params) => {
    let datetime = new Date(params.row.datetime);
    return getDateString(datetime);
  };
  const rowDetails = (params) => {
    let data = params.row;
    return `${data.name} (${data.module})`;
  };

  const columns = [
    { field: "type", headerName: "Event", flex: 0.15, valueGetter: rowType },
    {
      field: "hours",
      headerName: "Service Hours",
      flex: 0.15,
      headerAlign: "center",
      align: "center",
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
        columns={columns}
        rows={events}
        rowHeight={36}
        pagination="server"
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={[15, 25, 50, 100]}
        pageNum={pageNum}
        onPageChange={setPageNum}
        sx={{ border: "1px solid black", borderRadius: "8px" }}
        getRowId={(row) => row.uuid}
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
                  disabled={!props.allowUpdates}
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
      <Dialog
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
        }}
      >
        <CreateDMGame onAdd={onGameAdded} />
      </Dialog>
    </React.Fragment>
  );
}

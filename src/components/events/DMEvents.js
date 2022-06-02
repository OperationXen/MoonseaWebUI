import React, { useState, useEffect, useCallback } from "react";

import { Button, Dialog } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import { getDMEvents } from "../../api/events.js";
import CreateDMGame from "./CreateDMGame.js";

export default function DMEvents(props) {
  const { dmUUID } = props;

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

  useEffect(() => {
    refreshDMEvents();
  }, [refreshDMEvents, pageNum, pageSize]);

  const columns = [
    { field: "type", headerName: "Event", flex: 0.2 },
    { field: "hours", headerName: "Service Hours", flex: 0.1 },
    { field: "datetime", headerName: "Date", flex: 0.15 },
    { field: "name", headerName: "Details", flex: 0.6 },
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

import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import { getEventsForCharacter } from "../../api/events.js";
import CreateCharacterEvent from "./CreateCharacterEvent";

export default function CharacterEvents(props) {
  const { characterUUID, characterName } = props;

  const [createOpen, setCreateOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 0,
      col1: "Downtime Activity",
      col2: "2022/05/19",
      col3: "Catching up, exchanged 10 downtime days for 1 level",
    },
    {
      id: 1,
      col1: "Game",
      col2: "2022/05/17",
      col3: "Module CCC-PDXAGE-02-01 The Dark Hunt. Gained 200GP",
    },
    {
      id: 2,
      col1: "DM Service Reward",
      col2: "2022/05/04",
      col3: "Exchanged 10 hours service for 2500gp, tier 2 item: Bracers of defence",
    },
    {
      id: 3,
      col1: "Shopping",
      col2: "2022/05/04",
      col3: "Purchased chest, crowbar, bell, book, candle for 5gp, 4sp",
    },
  ]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getEventsForCharacter(
      characterUUID,
      pageSize,
      pageSize * (pageNum - 1)
    ).then((result) => {
      setEvents(result.data);
    });
  }, [characterUUID, pageNum, pageSize]);

  const columns = [
    { field: "col1", headerName: "Event", flex: 0.2 },
    { field: "col2", headerName: "Date", flex: 0.15 },
    { field: "col3", headerName: "Details", flex: 0.6 },
  ];

  return (
    <React.Fragment>
      <DataGrid
        columns={columns}
        rows={events}
        rowHeight={36}
        pagination="server"
        rowsPerPageOptions={[15, 25, 50, 100]}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        pageNum={pageNum}
        onPageChange={setPageNum}
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
        setOpen={setCreateOpen}
        name={characterName}
      />
    </React.Fragment>
  );
}

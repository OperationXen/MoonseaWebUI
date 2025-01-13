"use client";

import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import useSnackbar from "@/datastore/snackbar";
import { getDateString } from "@/utils/format";
import { useDMEvents } from "@/data/fetch/events/dungeonmaster";

import CreateEditDMGame from "./CreateEditDMGame";

import type { UUID } from "@/types/uuid";

type PropsType = {
  uuid: UUID;
  allowUpdates: boolean;
};

export default function DMEvents(props: PropsType) {
  const { uuid, allowUpdates } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data, isLoading, deleteEvent, updateEvent } = useDMEvents(uuid);

  const [createEditOpen, setCreateEditOpen] = useState(false);
  const [initialGameData, setInitialGameData] = useState([]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNum, setPageNum] = useState(1);

  const editItem = (data) => {
    if (data.event_type === "game") {
      setInitialGameData(data);
      setCreateEditOpen(true);
    }
  };

  const deleteItem = (type, uuid) => {
    if (type === "game") {
      deleteDMGame(uuid).then(() => {
        displayMessage("Removed DMed game", "info");
      });
    } else if (type === "dm_reward") {
      deleteDMReward(uuid).then(() => {
        displayMessage("Removed service reward", "info");
      });
    }
  };

  const getRowActions = (params) => {
    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        disabled={!allowUpdates}
        onClick={() => editItem(params.row)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        disabled={!allowUpdates}
        onClick={() => deleteItem(params.row.event_type, params.row.uuid)}
      />,
    ];
  };

  const rowType = (params) => {
    if (params.row.event_type === "game") return "DMed game";
    if (params.row.event_type === "dm_reward") return "Service reward";
  };
  const rowDate = (params) => {
    let datetime = new Date(params.row.datetime);
    return getDateString(datetime);
  };
  const rowHours = (params) => {
    if (params.row.event_type === "game") return params.row.hours;
    if (params.row.event_type === "dm_reward") return -params.row.hours;
  };
  const rowDetails = (params) => {
    let data = params.row;
    if (data.event_type === "game") {
      return `${data.name} (${data.module})`;
    }
    if (data.event_type === "dm_reward") {
      return `${data.name} given to ${data.character_items_assigned}`;
    }
  };

  const columns: GridColDef = [
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
      getActions: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        disableColumnMenu
        columns={columns}
        rows={data}
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
              <div
                style={{
                  alignSelf: "center",
                  marginLeft: "0.4em",
                }}
              >
                <Button
                  disabled={!allowUpdates}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setInitialGameData([]);
                    setCreateEditOpen(true);
                  }}
                >
                  Add Game
                </Button>
              </div>
              <GridPagination
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                }}
              />
            </div>
          ),
        }}
      />
      <CreateEditDMGame
        open={createEditOpen}
        data={initialGameData}
        onClose={() => setCreateEditOpen(false)}
        onAdd={onGameAdded}
      />
    </React.Fragment>
  );
}

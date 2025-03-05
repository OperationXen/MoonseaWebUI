"use client";

import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import TextsmsIcon from "@mui/icons-material/Textsms";

import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import AdventuringGearGridFooter from "./AdventuringGearGridFooter";
import { useAdventuringGear } from "@/data/fetch/items/adventuringgear";
import AdventuringGearDialog from "./AdventuringGearDialog";
import useSnackbar from "@/data/store/snackbar";
import NoGearOverlay from "./NoGearOverlay";

import type { UUID } from "@/types/uuid";
import type { AdventuringGear } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  editable: boolean;
};

export function AdventuringGearGrid(props: PropsType) {
  const { characterUUID } = props;

  const { displayMessage } = useSnackbar();
  const {
    data: adventuringGear,
    updateAdventuringGear,
    deleteAdventuringGear,
  } = useAdventuringGear(characterUUID);

  const [dialogOpen, setDialogOpen] = useState(false);

  const getRowActions = (p: GridRenderCellParams<AdventuringGear>) => {
    //if (!p.row.editable) return null;

    return (
      <Box className="flex items-center justify-end">
        <IconButton
          onClick={() => {
            deleteAdventuringGear(p.row).then(() =>
              displayMessage(`Removed ${p.row.name}`, "info"),
            );
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  const columns: GridColDef<AdventuringGear>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "description",
      flex: 4,
      headerName: "Description",
      renderCell: (p) => {
        return (
          <Box className="flex w-full items-center h-full justify-center">
            <Tooltip arrow placement="bottom" title={p.row.description}>
              <TextsmsIcon
                fontSize="small"
                className={p.row.description ? "" : "opacity-20"}
              />
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
    },
    {
      field: "count",
      headerName: "Number",
      flex: 1,
      renderCell: (p) => {
        return (
          <Box className="flex items-center justify-between">
            <IconButton
              onClick={() => {
                updateAdventuringGear({
                  uuid: p.row.uuid,
                  count: (p.row.count ?? 0) - 1,
                });
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography variant="body1">{p.row.count}</Typography>
            <IconButton
              onClick={() => {
                updateAdventuringGear({
                  uuid: p.row.uuid,
                  count: (p.row.count ?? 0) + 1,
                });
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      headerAlign: "center",
      renderCell: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <DataGrid
        autoPageSize
        getRowId={(x) => x.uuid}
        columns={columns}
        rows={adventuringGear}
        initialState={{
          sorting: {
            sortModel: [{ field: "equipped", sort: "desc" }],
          },
          columns: {
            columnVisibilityModel: { description: true },
          },
        }}
        slots={{
          footer: AdventuringGearGridFooter,
          noRowsOverlay: NoGearOverlay as any,
        }}
        slotProps={{
          footer: {
            onClick: () => {
              setDialogOpen(true);
            },
          },
        }}
        density="compact"
      />
      <AdventuringGearDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        characterUUID={characterUUID}
      />
    </React.Fragment>
  );
}

export default AdventuringGearGrid;

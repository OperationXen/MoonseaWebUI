"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Box, Container, Stack } from "@mui/material";
import { Typography, Divider } from "@mui/material";

import { useMagicItem } from "@/data/fetch/items/magicitems";
import MagicItemInformationPane from "./MagicItemInformationPane";
import MagicItemControlPane from "./MagicItemControlsPane";
import MagicItemHistoryPane from "./MagicItemHistoryPane";
import MagicItemImagePane from "./MagicItemImagePane";

import type { UUID } from "@/types/uuid";

export default function MagicItemDetails() {
  const { uuid } = useParams();

  const {data} = useMagicItem(uuid as UUID);

  const [editMode, setEditMode] = useState(false);

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Item Details
      </Typography>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "0.4em",
          justifyContent: "center",
          gap: "0.4em",
        }}
      >
        <Stack
          sx={{
            flexGrow: 1,
            alignItems: "center",
            border: "1px solid black",
            borderRadius: "8px",
          }}
        >
          {data && (
            <React.Fragment>
              <MagicItemInformationPane
                item={data}
                editMode={editMode}
                setEditMode={setEditMode}
              />
              <MagicItemImagePane item={data} />
              <MagicItemControlPane
                item={data}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            </React.Fragment>
          )}
        </Stack>
        <Stack sx={{ flexGrow: 1, minHeight: "30em" }}>
          <MagicItemHistoryPane uuid={uuid as UUID} />
        </Stack>
      </Box>
    </Container>
  );
}

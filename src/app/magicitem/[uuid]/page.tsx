"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { Box, Container } from "@mui/material";

import { useMagicItem } from "@/data/fetch/items/magicitems";
import MagicItemInformationPane from "./MagicItemInformationPane";
import MagicItemControlPane from "./MagicItemControlsPane";
import MagicItemHistoryPane from "./MagicItemHistoryPane";

const defaultImage = "/media/images/chest-mimic.png";

import type { UUID } from "@/types/uuid";

export default function MagicItemDetails() {
  const { uuid } = useParams();
  const { data: item } = useMagicItem(uuid as UUID);

  const [editMode, setEditMode] = useState(false);

  if (!item) return null;

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Box className="flex gap-2">
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Magic item image"
          src={item.image ?? defaultImage} />

        <MagicItemInformationPane
          item={item}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Box>
      <MagicItemControlPane
        item={item}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <MagicItemHistoryPane item={item} />
    </Container >
  );
}

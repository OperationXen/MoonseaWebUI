"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Container } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useMagicItem } from "@/data/fetch/items/magicitems";
import MagicItemInformationPane from "./MagicItemInformationPane";
import MagicItemControlPane from "./MagicItemControlsPane";
import MagicItemHistoryPane from "./MagicItemHistoryPane";

import type { UUID } from "@/types/uuid";
import LoadingOverlay from "@/components/general/LoadingOverlay";

export default function MagicItemDetails() {
  const { uuid } = useParams();
  const router = useRouter();
  const { displayMessage } = useSnackbar();
  const { data: item, isLoading } = useMagicItem(uuid as UUID);

  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <LoadingOverlay open={isLoading} />;

  if (!item) {
    displayMessage("No item with this ID", "error");
    router.push("/characters");
    return null;
  }

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <MagicItemInformationPane
        item={item}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <MagicItemControlPane
        item={item}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <MagicItemHistoryPane item={item} />
    </Container>
  );
}

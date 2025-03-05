"use client";

import { useState } from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { Box, Dialog, Typography, Divider } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useAdventuringGear } from "@/data/fetch/items/adventuringgear";
import { StandardAdventuringGear } from "./StandardAdventuringGear";
import CustomAdventuringGear from "./CustomAdventuringGear";

import type { UUID } from "@/types/uuid";

type PropsType = {
  open: boolean;
  onClose: () => void;
  characterUUID: UUID;
};

export function AdventuringGearDialog(props: PropsType) {
  const { open, onClose, characterUUID } = props;

  const { createAdventuringGear } = useAdventuringGear(characterUUID);
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [showCustom, setShowCustom] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: `2px solid black`,
          borderRadius: "16px",
          boxShadow: `2px 2px 60px black, 1px 1px 8px inset`,
          padding: "1.2em",
          display: "flex",
          gap: "0.6em",
          flexDirection: "column",
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        {"Add adventuring gear"}
      </Typography>
      <Divider variant="middle" />
      <Box sx={{ minHeight: "400px", overflowY: "scroll" }}>
        <StandardAdventuringGear />
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
            <Typography>Add custom item</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CustomAdventuringGear />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Dialog>
  );
}

export default AdventuringGearDialog;

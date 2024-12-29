import React, { useState } from "react";

import {
  Dialog,
  Box,
  Divider,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Typography, Select, MenuItem, InputLabel } from "@mui/material";

import CreateCharacterGame from "./character_event_panes/CreateCharacterGame";
import CreateDTSpellbookUpdate from "./character_event_panes/CreateDTSpellbookUpdate";
import CreateDTMundaneTrade from "./character_event_panes/CreateDTMundaneTrade";
import CreateDTCatchup from "./character_event_panes/CreateDTCatchup";

import type { UUID } from "@/types/uuid";
import type { EventType } from "@/types/events";

type PropsType = {
  characterUUID: UUID;
  charName: string;
  downtime: number;
  open: boolean;
  onClose: () => void;
};

export default function CreateCharacterEvent(props: PropsType) {
  const { characterUUID, charName, downtime, open, onClose } = props;

  const [event, setEvent] = useState<EventType>("game");

  if (!open) return null;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: "2px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px black",
          padding: "1.2em",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        {charName ? `Add event to ${charName}` : "Add event to character"}
      </Typography>
      <Divider variant="middle" />
      <Box margin="0.6em 0">
        <FormControl fullWidth>
          <InputLabel id="type-label">Event Type</InputLabel>
          <Select
            fullWidth
            label="Event Type"
            value={event}
            onChange={(e: SelectChangeEvent) =>
              setEvent(e.target.value as EventType)
            }
          >
            <Divider>Quick select</Divider>
            <MenuItem value="game">Played a game</MenuItem>
            <MenuItem value="dt_mtrade">Visited merchant</MenuItem>
            <Divider>Downtime activities</Divider>
            <MenuItem value="dt_catchingup" disabled={downtime < 10}>
              Catching up (gain a level)
            </MenuItem>
            <MenuItem value="dt_sbookupd">Copy spells to spellbook</MenuItem>
            <MenuItem value="dt_trade" disabled>
              Trade magical items
            </MenuItem>

            <MenuItem value="dt_scribe" disabled>
              Scribe scrolls
            </MenuItem>
            <MenuItem value="dt_brew" disabled>
              Brew potions
            </MenuItem>
            <MenuItem value="rebuild" disabled>
              Rebuild character
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {event === "game" && (
        <CreateCharacterGame
          characterUUID={characterUUID}
          onClose={handleClose}
        />
      )}
      {event === "dt_mtrade" && (
        <CreateDTMundaneTrade
          characterUUID={characterUUID}
          onClose={handleClose}
        />
      )}
      {event === "dt_catchingup" && (
        <CreateDTCatchup
          characterUUID={characterUUID}
          onClose={handleClose}
          downtime={downtime}
        />
      )}
      {event === "dt_sbookupd" && (
        <CreateDTSpellbookUpdate
          characterUUID={characterUUID}
          onClose={handleClose}
          downtime={downtime}
        />
      )}
    </Dialog>
  );
}

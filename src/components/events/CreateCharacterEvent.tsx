import React, { useState } from "react";

import { Dialog, Box, Divider } from "@mui/material";
import { FormControl, SelectChangeEvent } from "@mui/material";
import { Typography, Select, MenuItem, InputLabel } from "@mui/material";

import GameEventPane from "./character_event_panes/GameEventPane";
import DTEventSpellBookUpdatePname from "./character_event_panes/DTEventSpellbookUpdate";
import DTEventBastionTurn from "./character_event_panes/DTEventBastionTurn";
import DTEventFreeForm from "./character_event_panes/DTEventFreeForm";

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
      slotProps={{
        paper: {
          sx: {
            minWidth: "42em",
            border: "2px solid black",
            borderRadius: "16px",
            boxShadow: "2px 2px 60px black",
            padding: "1.2em",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          },
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
            <MenuItem value="dt_freeform">Add generic event</MenuItem>
            <Divider>Common downtime activities</Divider>
            <MenuItem value="dt_mtrade">Visit NPC merchant</MenuItem>
            <MenuItem value="dt_catchingup" disabled={downtime < 10}>
              Catching up (gain a level)
            </MenuItem>
            <MenuItem value="dt_sbookupd">Copy spells to spellbook</MenuItem>
            <MenuItem value="dt_trade" disabled>
              Trade magical items
            </MenuItem>
            <Divider>Bastion activities</Divider>
            <MenuItem value="dt_bastion">Take bastion turn</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {event === "game" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Game Details</Typography>
          </Divider>
          <GameEventPane characterUUID={characterUUID} onClose={handleClose} />
        </React.Fragment>
      )}
      {event === "dt_freeform" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Event details</Typography>
          </Divider>
          <DTEventFreeForm
            characterUUID={characterUUID}
            onClose={handleClose}
          />
        </React.Fragment>
      )}
      {event === "dt_mtrade" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Event details</Typography>
          </Divider>
          <DTEventFreeForm
            initialTitle="Visited NPC Merchant"
            characterUUID={characterUUID}
            onClose={handleClose}
          />
        </React.Fragment>
      )}
      {event === "dt_catchingup" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Catching up</Typography>
          </Divider>
          <DTEventFreeForm
            initialTitle="Catching up"
            characterUUID={characterUUID}
            onClose={handleClose}
          />
        </React.Fragment>
      )}

      {event === "dt_sbookupd" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Spellbook Update</Typography>
          </Divider>
          <DTEventSpellBookUpdatePname
            characterUUID={characterUUID}
            onClose={handleClose}
            downtime={downtime}
          />
        </React.Fragment>
      )}
      {event === "dt_bastion" && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "auto" }}>
            <Typography>Bastion turn</Typography>
          </Divider>
          <DTEventBastionTurn
            characterUUID={characterUUID}
            onClose={handleClose}
          />
        </React.Fragment>
      )}
    </Dialog>
  );
}

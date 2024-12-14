import { useState } from "react";

import { Dialog, Box, Divider, TextField, FormControl } from "@mui/material";
import { Typography, Select, MenuItem, InputLabel } from "@mui/material";

import CreateCharacterGame from "./character_event_panes/CreateCharacterGame";
import CreateDTSpellbookUpdate from "./character_event_panes/CreateDTSpellbookUpdate";
import CreateDTMundaneTrade from "./character_event_panes/CreateDTMundaneTrade";
import CreateDTCatchup from "./character_event_panes/CreateDTCatchup";

export default function CreateCharacterEvent(props) {
  const { characterUUID, downtime, open, onClose } = props;

  const [event, setEvent] = useState("game");

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
        {props.name ? `Add event to ${props.name}` : "Add event to character"}
      </Typography>
      <Divider variant="middle" />
      <Box margin="0.6em 0">
        <FormControl fullWidth>
          <InputLabel id="type-label">Event Type</InputLabel>
          <Select
            fullWidth
            label="Event Type"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          >
            <Divider>Quick select</Divider>
            <MenuItem value="game">Played a game</MenuItem>
            <MenuItem value="dt-mundtrade">Visited merchant</MenuItem>
            <Divider>Downtime activities</Divider>
            <MenuItem value="dt-catchup" disabled={downtime < 10}>
              Catching up (gain a level)
            </MenuItem>
            <MenuItem value="dt-spellbook">Copy spells to spellbook</MenuItem>
            <MenuItem value="dt-trade" disabled>
              Trade magical items
            </MenuItem>

            <MenuItem value="dt-scribe" disabled>
              Scribe scrolls
            </MenuItem>
            <MenuItem value="dt-brew" disabled>
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
      {event === "dt-mundtrade" && (
        <CreateDTMundaneTrade
          characterUUiD={characterUUID}
          onClose={handleClose}
        />
      )}
      {event === "dt-catchup" && (
        <CreateDTCatchup characterUUID={characterUUID} onClose={handleClose} />
      )}
      {event === "dt-spellbook" && (
        <CreateDTSpellbookUpdate
          characterUUID={characterUUID}
          onClose={handleClose}
        />
      )}
      {event === "trade-npc" && (
        <Box
          border="1px solid black"
          borderRadius="8px"
          sx={{
            display: "flex",
            height: "24em",
            justifyContent: "space-around",
            flexFlow: "column",
            padding: "0.4em",
            alignContent: "space-between",
          }}
        >
          <Typography>Trade with NPC</Typography>
          <TextField fullWidth multiline label="Items purchased" />
          <TextField fullWidth multiline label="Items sold" />
          <TextField
            number
            label="Gold"
            helperText="Negative for gold spent, positive for profit"
          />
          <TextField label="Game date" />
        </Box>
      )}
    </Dialog>
  );
}

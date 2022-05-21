import { useState } from "react";

import { Modal, Paper, Box, Divider } from "@mui/material";
import { Typography, Select, MenuItem, InputLabel } from "@mui/material";
import { TextField } from "@mui/material";
import { Translate } from "@mui/icons-material";

export default function CreateCharacterEvent(props) {
  const { open, setOpen } = props;

  const [event, setEvent] = useState("game");

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ left: "calc(50% - 20em)", top: "12em" }}
    >
      <Paper
        sx={{
          width: "40em",
          border: "2px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px black",
          padding: "1.2em",
          transition: "height 2s",
        }}
      >
        <Typography variant="h4" marginLeft="0.4em">
          Add event to character
        </Typography>
        <Divider variant="middle" />
        <Box margin="0.4em 0">
          <InputLabel id="type-label">Event Type</InputLabel>
          <Select
            fullWidth
            labelId="type-label"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          >
            <Divider>Quick select</Divider>
            <MenuItem value="game">Played a game</MenuItem>
            <MenuItem value="trade-npc">Trade mundane equipment</MenuItem>
            <Divider>Downtime activities</Divider>
            <MenuItem value="dt-catchup">Catching up (gain a level)</MenuItem>
            <MenuItem value="trade-item">Trade magical items</MenuItem>
            <MenuItem value="spellbook">Copy spells to spellbook</MenuItem>
            <MenuItem value="dt-scribe">Scribe scrolls</MenuItem>
            <MenuItem value="dt-brew">Brew potions</MenuItem>
            <MenuItem value="rebuild">Rebuild character</MenuItem>
          </Select>
        </Box>
        {event === "game" && (
          <Box
            border="1px solid black"
            borderRadius="8px"
            sx={{
              display: "flex",
              height: "26em",
              justifyContent: "space-between",
              flexFlow: "row wrap",
              padding: "0.4em",
              alignContent: "space-between",
            }}
          >
            <Typography>
              Game Details (Use this event type to record modules played and
              rewards earned)
            </Typography>

            <TextField fullWidth label="Game code / name" />
            <TextField label="DM Name" />
            <TextField label="Game date" />
            <TextField label="Downtime" />
            <TextField label="Gold earned" />
            <TextField fullWidth label="Item Reward" />
            <TextField fullWidth label="Consumables" />
          </Box>
        )}
        {event === "trade-npc" && (
          <Box
            border="1px solid black"
            borderRadius="8px"
            sx={{
              display: "flex",
              flexFlow: "row wrap",
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
      </Paper>
    </Modal>
  );
}

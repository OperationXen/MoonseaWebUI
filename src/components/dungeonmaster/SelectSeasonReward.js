import React, { useState } from "react";

import { Dialog, Box, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Divider, Chip } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function SelectSeasonReward(props) {
  const { data } = props;
  const [levelChar, setLevelChar] = useState(0);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: `2px solid ${getRarityColour(data.rarity)}`,
          boxShadow: `0 0 32px inset ${getRarityColour(data.rarity)}`,
          display: "flex",
          width: "42em",
          flexDirection: "column",
          alignItems: "center",
          padding: "0.6em",
        },
      }}
    >
      <Typography variant="h4" mb="0.4em">
        DM Reward: {data.name}
      </Typography>
      {data.level && (
        <React.Fragment>
          <Divider sx={{ width: "95%" }}>
            <Typography variant="body2">Character Advancement</Typography>
          </Divider>
          <Box width="100%">
            <FormControl>
              <InputLabel>Character to level up</InputLabel>
              <Select
                sx={{ width: "16em", justifySelf: "flex-start" }}
                label="Character to level up"
                value={levelChar}
                onChange={(e) => setLevelChar(e.target.value)}
              >
                <MenuItem value={0} divider>
                  None - skip level up
                </MenuItem>
                <MenuItem value={1}>Meepo</MenuItem>
                <MenuItem value={2}>Meza'aki</MenuItem>
                <MenuItem value={3}>Meeka</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </React.Fragment>
      )}
      <Divider sx={{ width: "95%" }}>
        <Typography variant="body2">Item rewards</Typography>
      </Divider>
    </Dialog>
  );
}

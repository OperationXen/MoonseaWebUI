import React, { useState } from "react";

import { Dialog, Box, Typography } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Divider, Button } from "@mui/material";

import { getRarityColour } from "../../../utils/itemUtils";
import RewardSelectWidget from "./RewardSelectWidget";

export default function SelectSeasonReward(props) {
  const { data } = props;
  const [levelChar, setLevelChar] = useState(0);
  const [rewardChar, setRewardChar] = useState(1);
  const [rewardItem, setRewardItem] = useState(0);

  const getRewardText = () => {
    let retval = "Misc rewards:";
    if (data.gold) retval += ` ${data.gold} GP`;
    if (data.downtime) retval += ` ${data.downtime} downtime days`;

    return retval;
  };

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
          padding: "1em 2em",
        },
      }}
    >
      <Typography variant="h4" mb="0.4em">
        DM Reward: {data.name}
      </Typography>
      {data.level && (
        <React.Fragment>
          <Divider sx={{ width: "95%", margin: "0.4em 0" }}>
            <Typography variant="body2">Character Advancement</Typography>
          </Divider>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body2" sx={{ opacity: "0.8" }}>
                Optional level up for any character
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      )}
      <Divider sx={{ width: "95%", margin: "0.4em 0" }}>
        <Typography variant="body2">Item rewards</Typography>
      </Divider>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl>
          <InputLabel>Character to recieve items</InputLabel>

          <Select
            sx={{ width: "16em", justifySelf: "flex-start" }}
            label="Character to recieve items"
            value={rewardChar}
            onChange={(e) => setRewardChar(e.target.value)}
          >
            <MenuItem value={0} divider disabled>
              None - skip item rewards
            </MenuItem>
            <MenuItem value={1}>Meepo</MenuItem>
            <MenuItem value={2}>Meza'aki</MenuItem>
            <MenuItem value={3}>Meeka</MenuItem>
          </Select>
        </FormControl>
        <RewardSelectWidget
          value={rewardItem}
          setValue={setRewardItem}
          rewards={data.rewards}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          margin: "0.6em",
        }}
      >
        <Typography variant="body2" sx={{ opacity: "0.8" }}>
          {getRewardText()}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ marginBottom: "1em", width: "50%" }}
      >{`Claim reward (${data.cost} hours)`}</Button>
    </Dialog>
  );
}

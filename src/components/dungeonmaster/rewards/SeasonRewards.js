import React, { useState, useEffect } from "react";

import { Box, Select, MenuItem, FormControl } from "@mui/material";

import SelectSeasonReward from "./SelectSeasonReward";
import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData11a from "../season11a.json";
import rewardData11b from "../season11b.json";

export default function SeasonRewards(props) {
  const { allowUpdates, dmUUID, hours, onChange } = props;

  const [rewards, setRewards] = useState(rewardData11b);
  const [selectedReward, setSelectedReward] = useState({});
  const [selectRewardOpen, setSelectRewardOpen] = useState(false);
  const [season, setSeason] = useState("11b");

  useEffect(() => {
    if (season === "11a") setRewards(rewardData11a);
    if (season === "11b") setRewards(rewardData11b);
  }, [season]);

  const handleSelect = (reward) => {
    if (allowUpdates && reward.cost <= hours) {
      setSelectedReward(reward);
      setSelectRewardOpen(true);
    }
  };

  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, width: "16em", margin: "4px 0 0" }} size="small">
        <Select value={season} onChange={(e) => setSeason(e.target.value)}>
          <MenuItem value={"11a"}>Season 11A</MenuItem>
          <MenuItem value={"11b"}>Season 11B</MenuItem>
        </Select>
      </FormControl>
      <Box
        width={"100%"}
        justifyContent={"space-around"}
        sx={{ flexFlow: "column", overflowY: "scroll" }}
      >
        {rewards.map((reward, index) => {
          return (
            <SeasonRewardWidget
              {...reward}
              locked={!allowUpdates || reward.cost > hours}
              key={index}
              onSelect={() => handleSelect(reward)}
            />
          );
        })}
      </Box>
      <SelectSeasonReward
        open={selectRewardOpen}
        onClose={() => setSelectRewardOpen(false)}
        dmUUID={dmUUID}
        data={selectedReward}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

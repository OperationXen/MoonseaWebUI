import React, { useState } from "react";
import { Box } from "@mui/material";

import SelectSeasonReward from "./SelectSeasonReward";
import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData from "../season11b.json";

export default function SeasonRewards(props) {
  const rewards = props.rewards || rewardData;
  const { allowUpdates, dmUUID, hours, onChange } = props;

  const [selectedReward, setSelectedReward] = useState({});
  const [selectRewardOpen, setSelectRewardOpen] = useState(false);

  const handleSelect = (reward) => {
    if (allowUpdates && reward.cost <= hours) {
      setSelectedReward(reward);
      setSelectRewardOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Box
        width={"100%"}
        justifyContent={"space-around"}
        sx={{ flexFlow: "column", overflowY: "scroll" }}
      >
        {rewards.map((reward, index) => {
          return (
            <SeasonRewardWidget
              {...reward}
              locked={reward.cost > hours}
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

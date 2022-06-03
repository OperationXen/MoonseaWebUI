import React, { useState } from "react";
import { Box } from "@mui/material";

import SelectSeasonReward from "./SelectSeasonReward";
import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData from "./season11b.json";

export default function SeasonRewards(props) {
  const rewards = props.rewards || rewardData;
  const dmHours = props.hours;

  const [selectedReward, setSelectedReward] = useState({});
  const [selectRewardOpen, setSelectRewardOpen] = useState(false);

  return (
    <React.Fragment>
      <Box
        width={"100%"}
        justifyContent={"space-around"}
        sx={{ flexFlow: "column", overflowY: "scroll" }}
      >
        {rewards.map((reward, index) => {
          debugger;
          return (
            <SeasonRewardWidget
              {...reward}
              locked={reward.cost > dmHours}
              key={index}
              onSelect={() => {
                setSelectedReward(reward);
                setSelectRewardOpen(true);
              }}
            />
          );
        })}
      </Box>
      <SelectSeasonReward
        open={selectRewardOpen}
        onClose={() => setSelectRewardOpen(false)}
        data={selectedReward}
      />
    </React.Fragment>
  );
}

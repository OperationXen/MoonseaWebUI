import React, { useState, useEffect } from "react";

import { Box, Select, MenuItem, FormControl } from "@mui/material";

import SelectSeasonReward from "./SelectDMServiceReward";
import SeasonRewardWidget from "./ServiceRewardWidget";
import rewardData11a from "@/config/dm-rewards/season11a.json";
import rewardData11b from "@/config/dm-rewards/season11b.json";
import rewardData12a from "@/config/dm-rewards/season12a.json";
import rewardData12b from "@/config/dm-rewards/season12b.json";
import rewardData12c from "@/config/dm-rewards/season12c.json";
import rewardData12d from "@/config/dm-rewards/season12d.json";
import rewardData12e from "@/config/dm-rewards/season12e.json";

import type { UUID } from "@/types/uuid";
import type { DMServiceReward } from "@/types/dm";

type PropsType = {
  allowUpdates: boolean;
  dmUUID: UUID;
  hours: number;
};

export default function SeasonRewards(props: PropsType) {
  const { allowUpdates, dmUUID, hours } = props;

  const [rewards, setRewards] = useState<DMServiceReward[]>(
    rewardData12e as DMServiceReward[],
  );
  const [selectedReward, setSelectedReward] = useState<DMServiceReward>();
  const [selectRewardOpen, setSelectRewardOpen] = useState(false);
  const [season, setSeason] = useState("12e");

  const onChange = () => {
    //TODO: invalidate state
  };

  useEffect(() => {
    if (season === "11a") setRewards(rewardData11a as DMServiceReward[]);
    if (season === "11b") setRewards(rewardData11b as DMServiceReward[]);
    if (season === "12a") setRewards(rewardData12a as DMServiceReward[]);
    if (season === "12b") setRewards(rewardData12b as DMServiceReward[]);
    if (season === "12c") setRewards(rewardData12c as DMServiceReward[]);
    if (season === "12d") setRewards(rewardData12d as DMServiceReward[]);
    if (season === "12e") setRewards(rewardData12e as DMServiceReward[]);
  }, [season]);

  const handleSelect = (reward: DMServiceReward) => {
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
          <MenuItem value={"12a"}>Season 12A</MenuItem>
          <MenuItem value={"12b"}>Season 12B</MenuItem>
          <MenuItem value={"12c"}>Season 12C</MenuItem>
          <MenuItem value={"12d"}>Season S50A</MenuItem>
          <MenuItem value={"12e"}>Season S50B</MenuItem>
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

import { Box, List, Typography, Divider } from "@mui/material";

import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData from "./season11b.json";

export default function SeasonRewards(props) {
  const rewards = props.rewards || rewardData;

  return (
    <Box
      display="flex"
      width={"100%"}
      justifyContent={"space-around"}
      sx={{ flexFlow: "row wrap", overflowY: "scroll" }}
    >
      {rewards.map((reward, index) => {
        return <SeasonRewardWidget {...reward} key={index} />;
      })}
    </Box>
  );
}

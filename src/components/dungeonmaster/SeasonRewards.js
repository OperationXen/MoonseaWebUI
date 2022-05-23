import { Box, List, Typography, Divider } from "@mui/material";

import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData from "./season11b.json";

export default function SeasonRewards(props) {
  const rewards = props.rewards || rewardData;

  return (
    <Box
      width={"100%"}
      justifyContent={"space-around"}
      sx={{ flexFlow: "column", overflowY: "scroll" }}
    >
      {rewards.map((reward, index) => {
        return <SeasonRewardWidget {...reward} key={index} />;
      })}
    </Box>
  );
}

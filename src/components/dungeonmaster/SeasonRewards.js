import { Box, List, Typography, Divider } from "@mui/material";

import SeasonRewardWidget from "./SeasonRewardWidget";
import rewardData from "./season11b.json";

export default function SeasonRewards(props) {
  const rewards = props.rewards || rewardData;

  return (
    <Box
      border={"1px solid black"}
      flexGrow={1}
      width={"100%"}
      display="flex"
      justifyContent={"space-around"}
      sx={{ flexFlow: "row wrap" }}
    >
      {rewards.map((reward) => {
        return <SeasonRewardWidget {...reward} />;
      })}
    </Box>
  );
}

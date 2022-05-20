import { Box, Card, Typography } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function SeasonRewardWidget(props) {
  const { name, rarity } = props;

  return (
    <Card
      sx={{
        margin: "0.4em 1em",
        height: "5em",
        minWidth: "14em",
        flexGrow: 0.48,
        border: `2px solid ${getRarityColour(rarity)}`,
        background: `${getRarityColour(rarity)}80`,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={550} padding={"0.2em"}>
          {name}
        </Typography>
        <Typography fontWeight={550} padding={"0.2em"}>
          10
        </Typography>
      </Box>
    </Card>
  );
}

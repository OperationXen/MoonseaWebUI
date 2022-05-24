import { Box, Card, Typography, Tooltip } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function SeasonRewardWidget(props) {
  const { name, rarity, reward, level, downtime, gold } = props;

  return (
    <Card
      sx={{
        margin: "0.4em 1em",
        minHeight: "5em",
        minWidth: "14em",
        border: `2px solid ${getRarityColour(rarity)}`,
        background: `${getRarityColour(rarity)}50`,
        boxShadow: "2px 2px 4px darkgrey",
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
        <Tooltip title="Cost in hours">
          <Typography fontWeight={550} padding={"0.2em"}>
            10
          </Typography>
        </Tooltip>
      </Box>
      <Box
        sx={{
          padding: "0.2em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
        }}
      >
        {level && (
          <Tooltip title="(Optional) level up for one of your characters">
            <Typography variant="body2">Level Up</Typography>
          </Tooltip>
        )}
        {gold && <Typography variant="body2">{gold} gp</Typography>}
        {downtime && (
          <Typography variant="body2">{downtime} downtime days</Typography>
        )}
      </Box>
      <Box
        sx={{
          padding: "0.2em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
        }}
      >
        {reward && (
          <Tooltip title="Includes an item">
            <Typography variant="caption">Item reward</Typography>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}

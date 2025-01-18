import { Box, Card, Typography, Tooltip } from "@mui/material";

import { getRarityColour } from "../../../utils/items";

export default function SeasonRewardWidget(props) {
  const { name, rarity, reward, level, downtime, gold, cost, locked } = props;

  const getBackgroundColour = () => {
    if (locked) return "#42424240";
    return `${getRarityColour(rarity)}42`;
  };
  const getBorderColour = () => {
    if (locked) return "#00000050";
    return getRarityColour(rarity);
  };
  const getTextStyle = () => {
    if (locked) return { color: "#00000050" };
    return { color: "black" };
  };

  return (
    <Card
      sx={{
        margin: "0.4em 1em",
        minHeight: "5em",
        minWidth: "14em",
        border: `2px solid ${getBorderColour()}`,
        background: getBackgroundColour(),
        boxShadow: "2px 2px 4px darkgrey",
      }}
      onClick={props.onSelect}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={550} padding={"0.2em"} sx={getTextStyle()}>
          {name}
        </Typography>
        <Tooltip title="Cost in hours">
          <Typography fontWeight={550} padding={"0.2em"} sx={getTextStyle()}>
            {cost}
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
            <Typography variant="body2" sx={getTextStyle()}>
              Level Up
            </Typography>
          </Tooltip>
        )}
        {gold && (
          <Typography variant="body2" sx={getTextStyle()}>
            {gold} gp
          </Typography>
        )}
        {downtime && (
          <Typography variant="body2" sx={getTextStyle()}>
            {downtime} downtime days
          </Typography>
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
            <Typography variant="caption" sx={getTextStyle()}>
              Item reward
            </Typography>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}

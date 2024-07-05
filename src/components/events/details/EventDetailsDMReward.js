import { Box, Typography } from "@mui/material";

export function EventDetailsDMReward(props) {
  const { data } = props;

  return (
    <Box sx={{ minHeight: "16em" }}>
      <Typography variant="body1">Reward type: {data.name}</Typography>
      <Typography variant="body1">Cost in hours: {data.hours}</Typography>
      <Typography variant="body1">Character: {data.character_items_assigned}</Typography>
      <Typography variant="body1">Gold: {data.gold}</Typography>
      <Typography variant="body1">Downtime: {data.downtime}</Typography>
    </Box>
  );
}

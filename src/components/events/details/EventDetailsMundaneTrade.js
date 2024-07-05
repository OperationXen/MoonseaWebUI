import { Box, Typography } from "@mui/material";

export function EventDetailsMundaneTrade(props) {
  const { data } = props;

  return (
    <Box sx={{ minHeight: "16em" }}>
      <Typography variant="body1">Gold: {data.gold_change}</Typography>
      <Typography variant="body1">Sold: {data.sold}</Typography>
      <Typography variant="body1">Purchased: {data.purchased}</Typography>
    </Box>
  );
}

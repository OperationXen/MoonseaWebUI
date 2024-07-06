import { Box, Typography } from "@mui/material";

export function EventDetailsSpellbookUpdate(props) {
  const { data } = props;

  return (
    <Box sx={{ minHeight: "16em" }}>
      <Typography variant="body1">Adjudicating DM: {data.dm}</Typography>
      <Typography variant="body1">Source of spells: {data.source}</Typography>
      <Typography variant="body1">Gold cost: {data.gold}</Typography>
      <Typography variant="body1">Downtime cost: {data.downtime}</Typography>
      <Typography variant="body1">Spells: {data.spells}</Typography>
    </Box>
  );
}

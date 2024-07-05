import { Box, Typography } from "@mui/material";

export function EventDetailsGame(props) {
  const { data } = props;

  return (
    <Box sx={{ minHeight: "16em" }}>
      <Typography variant="body1">Module code: {data.module}</Typography>
      <Typography variant="body1">Game name: {data.name}</Typography>
    </Box>
  );
}

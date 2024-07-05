import { Box, Typography } from "@mui/material";

export function EventDetailsCatchingUp(props) {
  const { data } = props;

  return (
    <Box sx={{ minHeight: "16em" }}>
      <Typography variant="body1">Additional details: {data.details}</Typography>
    </Box>
  );
}

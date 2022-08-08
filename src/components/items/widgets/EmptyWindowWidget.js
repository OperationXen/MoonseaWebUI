import { Box, Typography } from "@mui/material";

export default function EmptyWindowWidget(props) {
  const message = props.message || "Nothing here yet";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "6em 2em",
      }}
    >
      <Typography variant="h3" sx={{ color: "#42424242" }}>
        {message}
      </Typography>
    </Box>
  );
}

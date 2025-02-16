import { Box, CircularProgress } from "@mui/material";

export function ProcessingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30em",
        height: "12em",
        border: "3px dashed grey",
        borderRadius: "16px",
        opacity: "0.6",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default ProcessingSpinner;

import { Box, Typography } from "@mui/material";

export function NoGearOverlay() {
  return (
    <Box className="w-full h-full flex items-center justify-center">
      <Box
        sx={{ border: "4px dashed lightgrey", borderRadius: "12px" }}
        className="p-16 flex flex-col items-center gap-4"
      >
        <Typography variant="h6" className="opacity-50">
          No adventuring gear
        </Typography>
        <Typography variant="body2" className="opacity-50">
          Add gear by clicking the "add gear" button, or by adding a trade event
        </Typography>
      </Box>
    </Box>
  );
}

export default NoGearOverlay;

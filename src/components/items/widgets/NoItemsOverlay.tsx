import { Box, Typography } from "@mui/material";

export function NoItemsOverlay() {
  return (
    <Box className="w-full h-full flex items-center justify-center">
      <Box
        sx={{ border: "4px dashed lightgrey", borderRadius: "12px" }}
        className="p-16 flex flex-col items-center gap-4"
      >
        <Typography variant="h6" className="opacity-50">
          No items to display
        </Typography>
        <Typography variant="body2" className="opacity-50">
          Create a new item via a game entry, or by clicking the "Add item"
          button
        </Typography>
      </Box>
    </Box>
  );
}

export default NoItemsOverlay;
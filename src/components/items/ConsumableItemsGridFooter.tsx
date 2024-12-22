import { Box, Button } from "@mui/material";
import { GridPagination, GridSlotsComponentsProps } from "@mui/x-data-grid";

export function ConsumableItemsGridFooter(
  props: NonNullable<GridSlotsComponentsProps["footer"]>,
) {
  return (
    <Box
      className="flex px-1 py-1 h-10 items-center"
      sx={{ borderTop: "1px solid black" }}
    >
      <Button variant="outlined">Add consumable</Button>
      <GridPagination className="flex items-center justify-end" />
    </Box>
  );
}

export default ConsumableItemsGridFooter;

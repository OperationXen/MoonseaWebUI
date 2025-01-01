import { MouseEventHandler } from "react";

import { Box, Button, Checkbox, Typography } from "@mui/material";
import { GridPagination, GridSlotsComponentsProps } from "@mui/x-data-grid";

type ExtraProps = {
  hideMarket: boolean;
  setHideMarket: (newVal: boolean) => {};
};

export function MagicItemsGridFooter(
  props: NonNullable<GridSlotsComponentsProps["footer"]> & ExtraProps,
) {
  const { onClick, hideMarket, setHideMarket } = props;

  return (
    <Box
      className="flex px-1 h-11 items-center justify-between"
      sx={{ borderTop: "1px solid black" }}
    >
      <Box>
        <Button
          sx={{ pointerEvents: "auto" }}
          variant="outlined"
          onClick={onClick as MouseEventHandler<any>}
        >
          Add magic item
        </Button>
        <Checkbox
          className="ml-4"
          checked={hideMarket}
          onChange={() => setHideMarket(!hideMarket)}
        />
        <Typography className="opacity-70" variant="caption">
          Hide items in trading post
        </Typography>
      </Box>
      <GridPagination className="flex items-center justify-end" />
    </Box>
  );
}

export default MagicItemsGridFooter;

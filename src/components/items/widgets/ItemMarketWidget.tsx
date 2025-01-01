"use client";

import { useState } from "react";

import { IconButton, Tooltip, Box } from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useSnackbar from "@/datastore/snackbar";
import { useMagicItem } from "@/data/fetch/items/magicitems";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem;
  charUUID?: UUID;
};

export function ItemMarketWidget(props: PropsType) {
  const { item, charUUID } = props;

  const { updateItem } = useMagicItem(item.uuid, charUUID);
  const { displayMessage } = useSnackbar();

  const [mouseOver, setMouseOver] = useState(false);

  const getIcon = () => {
    if (mouseOver && item.market)
      return (
        <Tooltip title="Remove item from trading post">
          <RemoveShoppingCartIcon />
        </Tooltip>
      );
    if (mouseOver && !item.market)
      return (
        <Tooltip title="Send item to trading post">
          <ShoppingCartCheckoutIcon />
        </Tooltip>
      );
    else
      return (
        <ShoppingCartIcon
          color={item.market ? "primary" : "inherit"}
          className={item.market ? "opacity-100" : "opacity-20"}
        />
      );
  };

  return (
    <Box
      className="w-full h-full flex items-center justify-center"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <IconButton
        onClick={() => {
          updateItem({ uuid: item.uuid, market: !item.market }).then(() => {
            displayMessage(
              `${item.name} ${item.market ? "removed from trading post" : "sent to trading post"}`,
              "info",
            );
          });
        }}
      >
        {getIcon()}
      </IconButton>
    </Box>
  );
}

export default ItemMarketWidget;

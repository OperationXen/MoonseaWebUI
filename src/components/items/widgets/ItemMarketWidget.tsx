"use client";

import { useState } from "react";

import { IconButton, Tooltip, Box } from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useSnackbar from "@/data/store/snackbar";
import { useMagicItem } from "@/data/fetch/items/magicitems";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem;
  charUUID?: UUID;
  onAdd: () => void;
  onRemove: () => void;
};

export function ItemMarketWidget(props: PropsType) {
  const { item, charUUID, onAdd, onRemove } = props;

  const { updateItem } = useMagicItem(item.uuid, charUUID);
  const { displayMessage } = useSnackbar();

  const [mouseOver, setMouseOver] = useState(false);

  const getIcon = () => {
    if (mouseOver && item.market)
      return (
        <Tooltip title="Remove item from trading post" placement="left">
          <RemoveShoppingCartIcon />
        </Tooltip>
      );
    if (mouseOver && !item.market)
      return (
        <Tooltip title="Send item to trading post" placement="left">
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
          if (item.market) {
            onRemove();
            updateItem({ uuid: item.uuid, market: false }).then(() => {
              displayMessage(`${item.name} removed from trading post`, "info");
            });
          } else {
            onAdd();
          }
        }}
      >
        {getIcon()}
      </IconButton>
    </Box>
  );
}

export default ItemMarketWidget;

import { IconButton, Tooltip } from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useSnackbar from "@/datastore/snackbar";
import { useMagicItem } from "@/data/fetch/items/magicitems";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem;
};

export function ItemMarketWidget(props: PropsType) {
  const { item } = props;

  const { updateItem } = useMagicItem(item.uuid);
  const { displayMessage } = useSnackbar();

  return (
    <IconButton
      onClick={() => {
        updateItem({ uuid: item.uuid, market: !item.market }).then(() => {
          displayMessage(
            `${item.name} ${item.market ? "sent to trading post" : "removed from trading post"}`,
            "info",
          );
        });
      }}
    >
      <ShoppingCartIcon
        className={item.market ? "opacity-100" : "opacity-30"}
      />
    </IconButton>
  );
}

export default ItemMarketWidget;

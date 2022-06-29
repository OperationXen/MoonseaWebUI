import { Tooltip, Chip } from "@mui/material";

import { getRarityColour } from "../../../utils/itemUtils";

export default function ItemChipWidget(props) {
  const { item } = props;

  return (
    <Tooltip
      placement={"right"}
      title={`Equipped item: ${item.name} (${item.rarity})`}
    >
      <Chip
        label={item.name}
        sx={{
          background: `${getRarityColour(item.rarity)}A5`,
          border: `1px solid ${getRarityColour(item.rarity)}`,
          color: "white",
          minWidth: "10em",
          maxWidth: "14em",
          cursor: "pointer",
        }}
      />
    </Tooltip>
  );
}

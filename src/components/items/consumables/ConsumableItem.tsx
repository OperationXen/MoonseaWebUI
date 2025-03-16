import { Box, TextField, Select, MenuItem } from "@mui/material";

import type { Consumable, ConsumableType, Rarity } from "@/types/items";

type PropsType = {
  item: Consumable;
  editable: boolean;
  onChange: (c: Consumable) => void;
  onDelete: (c: Consumable) => void;
};

export function ConsumableItem(props: PropsType) {
  const { item, editable, onChange, onDelete } = props;

  return (
    <Box sx={{ display: "flex", gap: "2px", width: "100%" }}>
      <TextField
        value={item.name}
        label="Name"
        size="small"
        sx={{ flexGrow: 3 }}
        disabled={!editable}
      />
      <Select
        value={item.type}
        label="Consumable type"
        size="small"
        sx={{ flexGrow: 1 }}
        disabled={!editable}
      ></Select>
      <Select
        value={item.rarity}
        label="Rarity"
        size="small"
        sx={{ flexGrow: 1 }}
        disabled={!editable}
      ></Select>
    </Box>
  );
}

export default ConsumableItem;

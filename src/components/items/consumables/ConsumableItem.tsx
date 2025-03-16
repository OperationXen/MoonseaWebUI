import { Box, TextField, Select, MenuItem } from "@mui/material";

import type { Consumable } from "@/types/items";

type PropsType = {
  item: Consumable;
  editable: boolean;
  onChange: (c: Consumable) => void;
  onDelete: (c: Consumable) => void;
};

export function ConsumableItem(props: PropsType) {
  const { item, editable } = props;

  return (
    <Box sx={{ display: "flex", gap: "4px", width: "100%" }}>
      <TextField
        value={item.name}
        label="Name"
        size="small"
        sx={{ flexBasis: "50%" }}
        disabled={!editable}
      />
      <Select
        value={item.type}
        label="Consumable type"
        size="small"
        sx={{ flexBasis: "20%" }}
        disabled={!editable}
      >
        <MenuItem value="potion">Potion</MenuItem>
        <MenuItem value="scroll">Scroll</MenuItem>
        <MenuItem value="ammo">Ammo</MenuItem>
        <MenuItem value="gear">Gear</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
      <Select
        value={item.rarity}
        label="Rarity"
        size="small"
        sx={{ flexBasis: "20%" }}
        disabled={!editable}
      >
        <MenuItem value="common">Common</MenuItem>
        <MenuItem value="uncommon">Uncommon</MenuItem>
        <MenuItem value="rare">Rare</MenuItem>
        <MenuItem value="veryrare">Very rare</MenuItem>
        <MenuItem value="legendary">Legendary</MenuItem>
      </Select>
    </Box>
  );
}

export default ConsumableItem;

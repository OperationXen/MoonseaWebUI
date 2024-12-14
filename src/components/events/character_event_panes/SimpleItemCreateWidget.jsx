import DeleteIcon from "@mui/icons-material/Delete";

import { Box, TextField, FormControl, Select, MenuItem } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.4em",
  margin: "0.4em 0",
};

export function SimpleItemCreateWidget(props) {
  const { id, name, setName, rarity, setRarity, handleDelete } = props;

  return (
    <Box sx={row}>
      <TextField
        sx={{ flexGrow: 1 }}
        label="Item Reward"
        value={name}
        onChange={(e) => setName(id, e.target.value)}
      />
      <FormControl sx={{ minWidth: "12em" }}>
        <Select value={rarity} onChange={(e) => setRarity(id, e.target.value)}>
          <MenuItem value="common">Common</MenuItem>
          <MenuItem value="uncommon">Uncommon</MenuItem>
          <MenuItem value="rare">Rare</MenuItem>
          <MenuItem value="veryrare">Very Rare</MenuItem>
          <MenuItem value="legendary">Legendary</MenuItem>
        </Select>
      </FormControl>
      <Tooltip title="Remove this item reward">
        <IconButton
          sx={{ "&:hover": { color: "darkred" } }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default SimpleItemCreateWidget;

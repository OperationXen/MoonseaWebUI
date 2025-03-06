import { useState } from "react";

import { Box, TextField } from "@mui/material";

export function CustomAdventuringGear() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [weight, setWeight] = useState(0);
  // const [cost, setCost] = useState(0);
  const [count, setCount] = useState(1);

  return (
    <Box className="flex flex-col gap-2">
      <TextField
        fullWidth
        label="Item Name"
        value={name}
        placeholder="Potion of healing"
        onChange={(e) => setName(e.target.value)}
        required
      ></TextField>

      <TextField
        fullWidth
        label="Description"
        multiline
        minRows={1}
        maxRows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="A brief description of the gear"
      ></TextField>

      <Box className="flex gap-4">
        <TextField
          sx={{ flexGrow: 1, flexBasis: 1 }}
          value={count}
          label="Number"
          type="number"
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
      </Box>
    </Box>
  );
}

export default CustomAdventuringGear;

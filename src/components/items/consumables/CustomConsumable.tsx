"use client";

import { useState, useEffect } from "react";

import { Box, FormControl } from "@mui/material";
import { Select, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";

import type { Rarity, ConsumableType, PredefConsumable } from "@/types/items";

type PropsType = {
  addItem: (newItem: PredefConsumable) => void;
};

export function CustomConsumable(props: PropsType) {
  const { addItem } = props;

  const [name, setName] = useState<string>("");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [itemType, setItemType] = useState<ConsumableType>("potion");
  const [charges, setCharges] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [highlight, setHighlight] = useState(false);
  const [cost, setCost] = useState(50);

  const handleSubmit = () => {
    addItem({
      name,
      rarity,
      type: itemType,
      description,
      charges,
      cost,
    });
  };

  useEffect(() => {
    if (itemType === "potion") {
      switch (rarity) {
        case "common":
          setCost(25);
          return;
        case "uncommon":
          setCost(100);
          return;
        case "rare":
          setCost(1000);
          return;
        case "veryrare":
          setCost(10000);
          return;
        case "legendary":
          setCost(50000);
          return;
      }
    }
  }, [itemType, rarity, setCost]);

  return (
    <Box sx={{ display: "flex", flexFlow: "column", gap: "8px" }}>
      <Box sx={{ width: "100%", display: "flex", gap: "8px" }}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Item Name"
          value={name}
          placeholder="Potion of healing"
          onChange={(e) => setName(e.target.value)}
          error={highlight && !name}
          required
          size="small"
        ></TextField>
        <FormControl sx={{ width: "10em" }}>
          <InputLabel id="type-label">Item Type</InputLabel>
          <Select
            size="small"
            label="Item Type"
            value={itemType}
            onChange={(e: SelectChangeEvent) =>
              setItemType(e.target.value as ConsumableType)
            }
          >
            <MenuItem value="potion">Potion</MenuItem>
            <MenuItem value="scroll">Scroll</MenuItem>
            <MenuItem value="ammo">Ammunition</MenuItem>
            <MenuItem value="gear">Wearable gear</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        label="Description"
        size="small"
        multiline
        minRows={2}
        maxRows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item abilities and rule prompts"
      ></TextField>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
      >
        <FormControl sx={{ flexGrow: 1, flexBasis: 1 }}>
          <InputLabel id="type-label">Rarity</InputLabel>
          <Select
            size="small"
            label="Rarity"
            value={rarity}
            onChange={(e: SelectChangeEvent) =>
              setRarity(e.target.value as Rarity)
            }
          >
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="veryrare">Very Rare</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ flexGrow: 1, flexBasis: 1 }}
          value={charges}
          label="Charges"
          type="number"
          size="small"
          onChange={(e) => setCharges(parseInt(e.target.value))}
        />
        <TextField
          sx={{ flexGrow: 1, flexBasis: 1 }}
          value={cost}
          label="Cost (GP)"
          type="number"
          size="small"
          onChange={(e) => setCost(parseInt(e.target.value))}
        />
      </Box>

      <Box
        onMouseOver={() => setHighlight(true)}
        onMouseOut={() => setHighlight(false)}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disabled={!name}
        >
          {"Create Item"}
        </Button>
      </Box>
    </Box>
  );
}

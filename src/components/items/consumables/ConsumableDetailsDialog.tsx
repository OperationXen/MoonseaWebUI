"use client";

import { useState, useEffect } from "react";

import { Dialog, Typography, Divider, Box, FormControl } from "@mui/material";
import { Select, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { TextField, Button } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useConsumables } from "@/data/fetch/items/consumables";
import { getRarityColour } from "@/utils/items";

import type { UUID } from "@/types/uuid";
import type { Consumable, Rarity, ConsumableType } from "@/types/items";

type PropsType = {
  open: boolean;
  onClose: () => void;
  characterUUID: UUID;
  consumable: Consumable | null;
};

export function ConsumableDetailsDialog(props: PropsType) {
  const { open, onClose, characterUUID, consumable } = props;

  const { createConsumable, updateConsumable } = useConsumables(characterUUID);
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [name, setName] = useState<string>("");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [itemType, setItemType] = useState<ConsumableType>("potion");
  const [charges, setCharges] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!consumable) return;
    setName(consumable.name);
    setRarity(consumable.rarity);
    setItemType(consumable.type);
    setCharges(consumable.charges || 0);
    setDesc(consumable.description || "");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consumable]);

  const handleClose = () => {
    onClose();
    setName("");
    setDesc("");
    setCharges(0);
  };

  const handleSubmit = () => {
    let data: Partial<Consumable> = {
      uuid: consumable?.uuid || undefined,
      name: name,
      description: desc,
      rarity: rarity,
      type: itemType as ConsumableType,
      charges: charges,
    };
    if (consumable) {
      updateConsumable(data)
        .then(() => {
          displayMessage("Updated", "info");
          handleClose();
        })
        .catch((error) => {
          displayMessage("Error updating consumable item", "error");
          console.error(error);
        });
    } else {
      createConsumable(data)
        .then((response) => {
          displayMessage(`Added ${response.data.name}`, "success");
          handleClose();
        })
        .catch((error) => {
          displayMessage("Error adding consumable to character", "error");
          console.error(error);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: `2px solid ${getRarityColour(rarity)}`,
          borderRadius: "16px",
          boxShadow: `2px 2px 60px black, 1px 1px 8px inset ${getRarityColour(rarity)}`,
          padding: "1.2em",
          display: "flex",
          gap: "0.6em",
          flexDirection: "column",
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        {consumable ? "Edit existing consumable item" : "Create New Consumable"}
      </Typography>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          gap: "0.2em",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      ></Box>
      <Box sx={{ width: "100%", display: "flex", gap: "8px" }}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Item Name"
          value={name}
          placeholder="Potion of healing"
          onChange={(e) => setName(e.target.value)}
          error={highlight && !name}
          required
        ></TextField>
        <FormControl sx={{ width: "10em" }}>
          <InputLabel id="type-label">Item Type</InputLabel>
          <Select
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
        multiline
        minRows={1}
        maxRows={5}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Item abilities and rule prompts"
      ></TextField>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
      >
        <FormControl sx={{ flexGrow: 1, flexBasis: 1 }}>
          <InputLabel id="type-label">Rarity</InputLabel>
          <Select
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
          onChange={(e) => setCharges(parseInt(e.target.value))}
        />
      </Box>

      <Box
        display="flex"
        onMouseOver={() => setHighlight(true)}
        onMouseOut={() => setHighlight(false)}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "60%",
            margin: "auto",
          }}
          disabled={!name}
        >
          {consumable ? "Update item" : "Create Item"}
        </Button>
      </Box>
    </Dialog>
  );
}

export default ConsumableDetailsDialog;

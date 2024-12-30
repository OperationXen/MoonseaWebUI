"use client";

import { useState, useEffect } from "react";

import { Dialog, Typography, Divider, Box, FormControl } from "@mui/material";
import { Select, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { TextField, Button, Checkbox } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { useConsumables } from "@/data/fetch/items/consumables";
import { getRarityColour } from "@/utils/items";

import type { UUID } from "@/types/uuid";
import type { MagicItem, Rarity } from "@/types/items";

type PropsType = {
  open: boolean;
  onClose: () => void;
  characterUUID: UUID;
  item: MagicItem | null;
  defaultRarity?: Rarity;
};

export function CommonItemDialog(props: PropsType) {
  const { open, onClose, characterUUID, item, defaultRarity } = props;

  const { createConsumable, updateConsumable } = useConsumables(characterUUID);
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [name, setName] = useState<string>("");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [attunement, setAttunement] = useState(false);
  const [desc, setDesc] = useState<string>("");
  const [flavour, setFlavour] = useState("");
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setName(item?.name || "");
    setRarity(item?.rarity || defaultRarity || "uncommon");
    setDesc(item?.description || "");
    setFlavour(item?.flavour || "");
    setAttunement(item?.attunement || false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    let data: Partial<MagicItem> = {
      uuid: item?.uuid || undefined,
      name,
      rarity,
      description: desc,
      flavour,
      attunement,
    };
    if (item) {
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
        {item ? "Edit existing magic item" : "Create New Item"}
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
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <TextField
          sx={{ flexGrow: 2, flexBasis: 4 }}
          label="Item Name"
          value={name}
          placeholder="Item name"
          onChange={(e) => setName(e.target.value)}
          error={highlight && !name}
          required
        />
        <FormControl sx={{ flexGrow: 1, flexBasis: 2 }}>
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
        <Box
          sx={{
            flexBasis: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            border: "1px solid darkgrey",
            borderRadius: "4px",
            padding: "4px",
            cursor: "pointer",
          }}
          onClick={() => setAttunement(!attunement)}
        >
          <Checkbox checked={attunement} sx={{ padding: 0 }} />
          <Typography variant="caption">Attunement</Typography>
        </Box>
      </Box>

      <TextField
        label="Description"
        multiline
        minRows={2}
        maxRows={5}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Item abilities and rule prompts"
      />

      <TextField
        label="Flavour"
        multiline
        minRows={2}
        maxRows={5}
        value={flavour}
        onChange={(e) => setFlavour(e.target.value)}
        placeholder="Item flavour text"
      />

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
          {item ? "Update item" : "Create Item"}
        </Button>
      </Box>
    </Dialog>
  );
}

export default CommonItemDialog;

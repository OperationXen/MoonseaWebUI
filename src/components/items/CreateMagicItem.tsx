import { useState } from "react";

import { Dialog, Typography, Divider, Box, SelectChangeEvent } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { TextField, Button } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { createMagicItem } from "@/api/items";
import { getRarityColour } from "@/utils/items";

import type { UUID } from "@/types/uuid";
import type { Rarity } from "@/types/items";

type PropsType = {
  characterUUID: UUID;
  onCreate: () => void;
  open: boolean;
  onClose: () => void;
};

export default function CreateMagicItem(props: PropsType) {
  const { open, onClose, characterUUID, onCreate } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [attunement, setAttunement] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [flavour, setFlavour] = useState("");
  const [highlight, setHighlight] = useState(false);

  const handleClose = () => {
    setName("");
    setDesc("");
    setFlavour("");
    setAttunement(false);
    onClose();
  };
  const handleSubmit = () => {
    let data = {
      name: name,
      rarity: rarity,
      attunement: attunement,
      description: desc,
      flavour: flavour,
    };
    createMagicItem(characterUUID, data)
      .then((response) => {
        displayMessage(`Added ${response.data.name}`, "success");
        onCreate();
        handleClose();
      })
      .catch((error) => {
        displayMessage("Error adding item to character", "error");
      });
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
        Add item to character
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
      >
        <FormControl sx={{ flexGrow: 0.5 }}>
          <InputLabel id="type-label">Rarity</InputLabel>
          <Select
            label="Rarity"
            value={rarity}
            onChange={(e: SelectChangeEvent) => setRarity(e.target.value as Rarity)}
          >
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="veryrare">Very Rare</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={attunement} onChange={() => setAttunement(!attunement)} />}
          label="Attunement required"
        />
      </Box>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={highlight && !name}
        required
      ></TextField>
      <TextField
        label="Description"
        multiline
        minRows={1}
        maxRows={5}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Item abilities and rule prompts"
      ></TextField>
      <TextField
        label="Flavour Text"
        multiline
        minRows={1}
        maxRows={3}
        placeholder="Any RP flavour associated with the item"
        value={flavour}
        onChange={(e) => setFlavour(e.target.value)}
      ></TextField>
      <Box display="flex" onMouseOver={() => setHighlight(true)} onMouseOut={() => setHighlight(false)}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "60%",
            margin: "auto",
          }}
          disabled={!name}
        >
          Create Item
        </Button>
      </Box>
    </Dialog>
  );
}

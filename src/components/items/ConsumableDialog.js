import { useState } from "react";

import { Dialog, Typography, Divider, Box } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { TextField, Button } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import { createConsumable } from "../../api/consumables";
import { getRarityColour } from "../../utils/items";

export function ConsumableDialog(props) {
  const { open, onClose, characterUUID, onCreate } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [name, setName] = useState("");
  const [rarity, setRarity] = useState("uncommon");
  const [itemType, setItemType] = useState("potion");
  const [charges, setCharges] = useState(0);
  const [desc, setDesc] = useState("");

  const [highlight, setHighlight] = useState(false);

  const handleClose = () => {
    setName("");
    setDesc("");
    onClose();
  };
  const handleSubmit = () => {
    let data = {
      name: name,
      description: desc,
      rarity: rarity,
      type: itemType,
      charges: charges,
    };
    createConsumable(characterUUID, data)
      .then((response) => {
        displayMessage(`Added ${response.data.name}`, "success");
        onCreate();
        handleClose();
      })
      .catch((error) => {
        displayMessage("Error adding consumable to character", "error");
        console.error(error);
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
        Create New Consumable
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
          <Select label="Item Type" value={itemType} onChange={(e) => setItemType(e.target.value)}>
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
      <Box sx={{ display: "flex", width: "100%", gap: "8px", justifyContent: "space-between" }}>
        <FormControl sx={{ flexGrow: 0.5 }}>
          <InputLabel id="type-label">Rarity</InputLabel>
          <Select label="Rarity" value={rarity} onChange={(e) => setRarity(e.target.value)}>
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="veryrare">Very Rare</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={!!charges} onChange={() => setCharges(charges ? 0 : 1)} />}
          label="Has charges"
        />
        <TextField
          value={charges}
          label="Charges"
          type="number"
          disabled={!charges}
          onChange={(e) => setCharges(parseInt(e.target.value))}
        />
      </Box>
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

export default ConsumableDialog;

import { useState } from "react";

import { Dialog, Typography, Divider, Box } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { TextField, Button } from "@mui/material";

import { getRarityColour } from "../../utils/itemUtils";

export default function CreateMagicItem(props) {
  const { open, onClose } = props;

  const [rarity, setRarity] = useState("uncommon");
  const [attunement, setAttunement] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [flavour, setFlavour] = useState("");
  const [highlight, setHighlight] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSubmit = () => {};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: `2px solid ${getRarityColour(rarity)}`,
          borderRadius: "16px",
          boxShadow: `2px 2px 60px black, 1px 1px 8px inset ${getRarityColour(
            rarity
          )}`,
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
            onChange={(e) => setRarity(e.target.value)}
          >
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="veryrare">Very Rare</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={attunement}
              onChange={() => setAttunement(!attunement)}
            />
          }
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
          Create Item
        </Button>
      </Box>
    </Dialog>
  );
}

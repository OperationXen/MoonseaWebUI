"use client";

import { useState } from "react";

import { Dialog, Button, TextField, Box } from "@mui/material";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";

import { itemSourceSearchFn } from "@/data/fetch/items/itemsource";
import ItemSourceGrid from "./ItemSourceGrid";

import type { ItemSourceSearch } from "@/types/meta";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

export function ItemSourceDialog(props: PropsType) {
  const { open, onClose } = props;

  const [itemName, setItemName] = useState("");
  const [debounce, setDebounce] = useState(false);
  const [results, setResults] = useState<ItemSourceSearch[]>([]);

  const handleSearch = () => {
    setDebounce(true);
    itemSourceSearchFn(itemName).then((r) => setResults(r));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search for sources of items</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "36em",
          height: "40em",
        }}
      >
        <TextField
          sx={{ marginTop: "6px" }}
          fullWidth
          label="Item name"
          value={itemName}
          onChange={(e) => {
            setResults([]);
            setDebounce(false);
            setItemName(e.target.value);
          }}
          placeholder="Wand of metagaming"
        />
        <ItemSourceGrid data={results} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={itemName.length < 3 || debounce}
        >
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemSourceDialog;

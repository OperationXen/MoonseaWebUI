"use client";

import { useState } from "react";

import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Dialog, Button, TextField } from "@mui/material";

type PropsType = {
  open: boolean;
  onClose: () => void;
  text: string;
  setText: (newVal: string) => void;
};

export function BiographyModal(props: PropsType) {
  const { open, onClose, text, setText } = props;

  const [value, setValue] = useState(text);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{"Character biography"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          maxRows={10}
          minRows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
      >
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setText(value);
            onClose();
          }}
          disabled={text === value}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BiographyModal;

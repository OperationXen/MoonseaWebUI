"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Typography } from "@mui/material";

import { doCharacterImport } from "@/data/fetch/import";
import ProcessingSpinner from "./ProcessingSpinner";
import useSnackbar from "@/datastore/snackbar";

import FileDropZone from "./FileDropZone";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

export function ImportCharacterDialog(props: PropsType) {
  const { open, onClose } = props;

  const { displayMessage: snackbar } = useSnackbar();

  const [processing, setProcessing] = useState(false);

  const handleFileChosen = (data: ArrayBuffer) => {
    setProcessing(true);
    doCharacterImport(data)
      .then(() => {
        snackbar("Imported from file", "success");
        setProcessing(false);
        onClose();
      })
      .catch((_e) => {
        setProcessing(false);
        snackbar(`Import failed: ${_e}`, "error");
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!processing) onClose();
      }}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid black",
          boxShadow: `0 0 4px inset black`,
          display: "flex",
          width: "42em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4">
          {processing ? "Processing file" : "Import character from CSV"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {(processing && <ProcessingSpinner />) || (
          <FileDropZone onFileChosen={handleFileChosen} />
        )}
        <br />
        <Typography sx={{ fontSize: 10 }}>
          This will create a new character, populated with the games and magic
          items contained within the import CSV. However, trade history of magic
          items will not be recreated (these items will be flagged as being
          imported). Only games, purchases and DM events such as rewards will be
          imported - this may lead to complications for which you have my
          sympathies.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCharacterDialog;

"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box, Divider, Typography } from "@mui/material";

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

  const handleFileChosen = (data: string) => {
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
          items contained within the import CSV. However this process is
          hampered a little by the exported CSV format. Your character will have
          been assumed to take every level up offered, have never spent any
          downtime or gold.
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          Magic items obtained via trade may not show up properly.
        </Typography>
        <Divider sx={{ marginY: "4px" }} />
        <Typography variant="body2" textAlign={"center"}>
          Please carefully check the generated character against your records!
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCharacterDialog;

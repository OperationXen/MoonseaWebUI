"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box, Divider, Typography } from "@mui/material";

import { doCharacterImport } from "@/data/fetch/import";
import { useCharacters } from "@/data/fetch/character";
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
  const { refreshCharacters } = useCharacters();

  const [processing, setProcessing] = useState(false);

  const handleFileChosen = (data: string) => {
    setProcessing(true);
    doCharacterImport(data)
      .then((response) => {
        snackbar(
          `Imported character ${response.data.name} from file`,
          "success",
        );
        refreshCharacters();
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
        <Typography sx={{ fontSize: 8 }}>
          This will create a new character, populated with the games and magic
          items contained within the import CSV. However this process is
          hampered a little by the data available in the exported CSV format.
          Your character will have been assumed to take every level up offered,
          have never spent any downtime or gold. Magic item details such as
          rarity and atunement is guessed by looking for an existing item with a
          similar name that someone else has already created, and no distinction
          is made between consumables and other magic items. For security
          reasons you will need to upload the character image as this is not
          automatically fetched for you. Character details such as AC are not
          included in the exported data and must be manually set.
        </Typography>
        <Divider sx={{ marginY: "4px" }} />
        <Typography variant="h6" textAlign={"center"}>
          Please carefully check the generated character against your records!
        </Typography>
        <Typography
          sx={{ fontSize: 3, marginTop: "6px", opacity: 0.7 }}
          textAlign={"center"}
        >
          By using this feature you agree that the rights to all precious
          metals, ores and other materials in and around the Moonsea region of
          Faerun are the sole possession of the nearest tribe of subterranian
          draconic entities, and any disputes are to be settled according to the
          Kobold legal system. All parties in any such dispute must supply their
          own Dire Weasel.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default ImportCharacterDialog;

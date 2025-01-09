"use client";

import { useRouter } from "next/navigation";

import { Typography, Button, Box, Divider, Dialog } from "@mui/material";

import { useCharacter } from "@/data/fetch/character";
import useSnackbar from "@/datastore/snackbar";

import type { UUID } from "@/types/uuid"

type PropsType = {
  open: boolean;
  onClose: () => void;
  uuid: UUID;
  name: string;
};

export function CharacterDeleteConfirmation(props: PropsType) {
  const { open, uuid, name, onClose } = props;

  const router = useRouter();
  const { deleteCharacter } = useCharacter(uuid);

  const displayMessage = useSnackbar((s) => s.displayMessage);

  const handleDelete = () => {
    deleteCharacter().then(() => {
      displayMessage(`Character ${props.name} deleted`, "info");
      router.push("/characters");
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid darkred",
          boxShadow: `0 0 8px inset darkred`,
          display: "flex",
          width: "32em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <Typography variant="h4">Confirm Delete</Typography>
      <Divider sx={{ width: "95%" }} />
      <Typography variant="body1" sx={{ padding: "0.6em" }}>
        Are you sure you want to delete {name}?
      </Typography>
      <Typography variant="caption" sx={{ padding: "0.6em", margin: "auto" }}>
        This action cannot be undone
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "35%",
            background: "darkred",
            ":hover": { background: "firebrick" },
          }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          color="inherit"
          variant="contained"
          sx={{ width: "35%" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default CharacterDeleteConfirmation;

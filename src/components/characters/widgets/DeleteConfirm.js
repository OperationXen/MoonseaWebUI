import { Dialog, Typography, Button, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { deleteCharacter } from "../../../api/character";
import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";

export default function DeleteConfirm(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestRefresh = useCharacterStore((s) => s.requestRefresh);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteCharacter(props.ID).then(() => {
      requestRefresh();
      displayMessage(`Character ${props.name} deleted`, "info");
      navigate("/");
    });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: { padding: "0.6em", width: "32em" },
      }}
    >
      <Typography variant="h4">Confirm Delete</Typography>
      <Divider />
      <Typography variant="body" sx={{ padding: "0.6em" }}>
        Are you sure you want to delete {props.name}?
      </Typography>
      <Typography variant="caption" sx={{ padding: "0.6em", margin: "auto" }}>
        This action cannot be undone
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "35%" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          color="inherit"
          variant="contained"
          sx={{ width: "35%" }}
          onClick={props.onClose}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

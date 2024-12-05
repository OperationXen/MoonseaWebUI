import { Dialog, Typography, Button, Box, Divider } from "@mui/material";

import { deleteTradeAdvert } from "../../../api/trade";
import useSnackbar from "../../../datastore/snackbar";
import useTradeStore from "../../../datastore/trade";

export default function DeleteConfirm(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestAdvertRefresh = useTradeStore((s) => s.requestRefresh);

  const handleDelete = () => {
    deleteTradeAdvert(props.uuid)
      .then(() => {
        displayMessage(
          `Advert deleted, ${props.name} has been returned to ${props.owner_name}'s inventory`,
          "info"
        );
        requestAdvertRefresh();
        props.onClose();
      })
      .catch((error) => {
        displayMessage(error.response.data.message, "error");
        props.onClose();
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid darkblue",
          boxShadow: `0 0 8px inset darkblue`,
          display: "flex",
          width: "32em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <Typography variant="h4">Confirm item return</Typography>
      <Divider width="95%" />
      <Typography variant="body" sx={{ padding: "0.6em" }}>
        Are you sure you want to remove {props.name} from the trading post? This
        item will be returned to {props.owner_name}'s inventory.
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
            background: "",
            ":hover": { background: "darkblue" },
          }}
          onClick={handleDelete}
        >
          Return to owner
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

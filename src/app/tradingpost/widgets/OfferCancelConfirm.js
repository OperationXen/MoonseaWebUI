import { Dialog, Typography, Button, Box, Divider } from "@mui/material";

import { deleteTradeOffer } from "../../../api/trade";
import useSnackbar from "../../../datastore/snackbar";
import useTradeStore from "../../../datastore/trade";

export default function OfferCancelConfirm(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestOfferRefresh = useTradeStore((s) => s.requestRefresh);

  const handleReject = () => {
    deleteTradeOffer(props.uuid)
      .then((response) => {
        displayMessage("Offer rescinded", "info");
        requestOfferRefresh();
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
      <Typography variant="h4">Confirm offer withdrawl</Typography>
      <Divider width="95%" />
      <Typography variant="body" sx={{ padding: "0.2em" }}>
        Are you sure you want to withdraw your offer of
      </Typography>
      <Typography sx={{ padding: "0.4em 0 0.8em" }}>
        {props.item?.name}
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
            background: "darkblue",
            ":hover": { background: "blue" },
          }}
          onClick={() => handleReject()}
        >
          Withdraw offer
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

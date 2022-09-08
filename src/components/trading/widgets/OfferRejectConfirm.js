import { Dialog, Typography, Button, Box, Divider } from "@mui/material";

import { rejectTradeOffer } from "../../../api/trade";
import useSnackbar from "../../../datastore/snackbar";
import useTradeStore from "../../../datastore/trade";

export default function OfferRejectConfirm(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestOfferRefresh = useTradeStore((s) => s.requestRefresh);

  const handleReject = () => {
    rejectTradeOffer(props.uuid)
      .then((response) => {
        displayMessage("Offer rejected", "info");
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
      <Typography variant="h4">Confirm offer rejection</Typography>
      <Divider width="95%" />
      <Typography variant="body" sx={{ padding: "0.2em" }}>
        Are you sure you want to reject
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
            background: "darkred",
            ":hover": { background: "firebrick" },
          }}
          onClick={() => handleReject()}
        >
          Reject offer
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

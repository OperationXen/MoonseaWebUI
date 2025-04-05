import { Dialog, Typography, Button, Box, Divider } from "@mui/material";

import { rejectTradeOffer } from "../../../api/trade";
import useSnackbar from "../../../data/store/snackbar";
import useTradeStore from "../../../data/store/trade";

import type { TradeOffer } from "@/types/trade";

type PropsType = {
  open: boolean;
  onClose: () => void;
  offer?: TradeOffer;
};

export function OfferRejectConfirm(props: PropsType) {
  const { open, onClose, offer } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestOfferRefresh = useTradeStore((s) => s.requestRefresh);

  const handleReject = () => {
    rejectTradeOffer(offer?.uuid)
      .then((_response) => {
        displayMessage("Offer rejected", "info");
        requestOfferRefresh();
        onClose();
      })
      .catch((error) => {
        displayMessage(error.response.data.message, "error");
        onClose();
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
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
        },
      }}
    >
      <Typography variant="h4">Confirm offer rejection</Typography>
      <Divider />
      <Typography variant="body1" sx={{ padding: "0.2em" }}>
        Are you sure you want to reject
      </Typography>
      <Typography sx={{ padding: "0.4em 0 0.8em" }}>
        {offer?.item?.name}
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
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}

export default OfferRejectConfirm;

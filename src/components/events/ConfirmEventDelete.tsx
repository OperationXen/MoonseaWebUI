import { Typography, Button, Box, Divider, Dialog } from "@mui/material";

import { getEventName } from "@/utils/events";

import type { AnyEvent } from "@/types/events";

type PropsType = {
  event?: AnyEvent;
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmEventDelete(props: PropsType) {
  const { event, onClose, onConfirm } = props;

  return (
    <Dialog
      open={!!event}
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
      <Typography variant="h4">Confirm Delete</Typography>
      <Divider sx={{ width: "95%" }} />
      <Typography variant="body1" sx={{ padding: "0.6em" }}>
        Are you sure you want to delete {getEventName(event)}?
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
          onClick={onConfirm}
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

export default ConfirmEventDelete;

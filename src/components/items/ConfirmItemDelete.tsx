import { Typography, Button, Box, Divider, Dialog } from "@mui/material";

import type { MagicItem } from "@/types/items";

type PropsType = {
  item?: MagicItem;
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmItemDelete(props: PropsType) {
  const { item, onClose, onConfirm } = props;

  return (
    <Dialog
      open={!!item}
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
        Are you sure you want to delete {item?.name}?
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

export default ConfirmItemDelete;

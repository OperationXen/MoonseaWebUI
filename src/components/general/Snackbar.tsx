"use client";

import { Alert, Snackbar as MUISnackbar } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";

export function Snackbar() {
  const { open, setOpen, message, severity } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MUISnackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}

export default Snackbar;

import { Alert, Snackbar } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";

export default function FeedbackBar(props) {
  const [open, setOpen, message, severity] = useSnackbar((s) => [
    s.open,
    s.setOpen,
    s.message,
    s.severity,
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

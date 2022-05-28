import { Modal, Paper, Typography } from "@mui/material";

export default function LoadingOverlay(props) {
  const { show } = props;

  return (
    <Modal
      open={show}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ padding: "2em" }}>
        <Typography>Loading</Typography>
      </Paper>
    </Modal>
  );
}

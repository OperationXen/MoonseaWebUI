import { Modal, Paper, Typography } from "@mui/material";

type PropsType = {
  open: boolean;
};

export function LoadingOverlay(props: PropsType) {
  const { open } = props;

  return (
    <Modal
      open={open}
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

export default LoadingOverlay;

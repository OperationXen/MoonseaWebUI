import { Modal, Paper, Typography } from "@mui/material";

type PropsType = {
  show: boolean;
};

export function LoadingOverlay(props: PropsType) {
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

export default LoadingOverlay;

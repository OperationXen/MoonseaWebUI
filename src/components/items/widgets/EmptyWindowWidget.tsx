import { Box, Typography } from "@mui/material";

type PropsType = {
  message: string;
};

export default function EmptyWindowWidget(props: PropsType) {
  const { message } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "6em 2em",
      }}
    >
      <Typography variant="h3" sx={{ color: "#42424242" }}>
        {message}
      </Typography>
    </Box>
  );
}

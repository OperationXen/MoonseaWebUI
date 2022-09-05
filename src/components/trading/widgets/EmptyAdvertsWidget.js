import { Container, Typography, Box } from "@mui/material";

export default function EmptyAdvertsWidget(props) {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4em",
          border: "4px dashed #42424232",
          borderRadius: "16px",
          gap: "2em",
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#42424242", textAlign: "center" }}
        >
          You have no items in the trading post
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#42424242", textAlign: "center" }}
        >
          Advertise some items for trade to see them here
        </Typography>
      </Box>
    </Container>
  );
}

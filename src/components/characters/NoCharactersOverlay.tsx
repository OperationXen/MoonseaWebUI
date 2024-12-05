import { Container, Typography, Box, Button } from "@mui/material";

type PropsType = {
  onClick: () => void;
};

export function NoCharactersOverlay(props: PropsType) {
  const { onClick } = props;

  return (
    <Container
      sx={{
        display: "flex",
        height: "70%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "4em",
          border: "4px dashed #42424232",
          borderRadius: "16px",
        }}
      >
        <Typography variant="h3" sx={{ color: "#42424242" }}>
          No characters yet
        </Typography>
        <Button sx={{ marginTop: "2em", opacity: 0.8 }} onClick={onClick}>
          Create
        </Button>
      </Box>
    </Container>
  );
}

export default NoCharactersOverlay;

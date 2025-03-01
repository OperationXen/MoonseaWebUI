import { Container, Typography, Box, Button } from "@mui/material";

type PropsType = {
  onCreateClick: () => void;
  onImportClick: () => void;
};

export function NoCharactersOverlay(props: PropsType) {
  const { onCreateClick, onImportClick } = props;

  return (
    <Container
      sx={{
        display: "flex",
        height: "calc(100vh - 12em)",
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
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "#42424242" }}>
          No characters yet
        </Typography>
        <Button
          variant="outlined"
          sx={{ marginTop: "2em", opacity: 0.8 }}
          onClick={onCreateClick}
        >
          Create new character
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "2em", opacity: 0.8 }}
          onClick={onImportClick}
        >
          Import existing Adventurer's League Logs file
        </Button>
      </Box>
    </Container>
  );
}

export default NoCharactersOverlay;

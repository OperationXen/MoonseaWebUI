import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import EmptyWindowWidget from "./widgets/EmptyWindowWidget";

export default function WindowCommonItems() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row wrap",
        }}
      >
        <EmptyWindowWidget message="No common items" />
      </Box>
      <Box
        sx={{
          marginTop: "auto",
          borderTop: "1px solid black",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: "0.4em",
        }}
      >
        <Button startIcon={<AddIcon />} variant="outlined">
          Add Common Item
        </Button>
      </Box>
    </Box>
  );
}

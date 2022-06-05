import { Box, Divider, Typography, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function StatsWidget(props) {
  const { value, setValue, name } = props;

  return (
    <Box
      sx={{
        ...props.sx,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">{name}</Typography>
      <Divider sx={{ width: "50%" }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => value > 0 && setValue(value - 1)}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h5">{value}</Typography>
        <IconButton onClick={() => setValue(value + 1)}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

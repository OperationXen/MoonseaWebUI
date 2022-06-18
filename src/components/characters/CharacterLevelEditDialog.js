import { Typography, Dialog, Box, Divider, IconButton } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CharacterLevelEditDialog(props) {
  const { open, onClose, data } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid black",
          boxShadow: `0 0 4px inset black`,
          display: "flex",
          width: "42em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <Typography variant="h4" sx={{ alignSelf: "flex-start" }}>
        Configure class levels
      </Typography>
      <Divider sx={{ width: "95%", margin: "0.6em 0" }} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl>
          <InputLabel>Character Class</InputLabel>
          <Select label="Character Class" sx={{ minWidth: "12em" }}>
            <MenuItem value="barbarian">Barbarian</MenuItem>
            <MenuItem value="bard">Bard</MenuItem>
            <MenuItem value="cleric">Cleric</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Subclass</InputLabel>
          <Select label="Subclass" sx={{ minWidth: "18em" }}></Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <RemoveIcon />
          </IconButton>
          <Typography>10</Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );
}

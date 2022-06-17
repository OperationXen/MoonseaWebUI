import { useState } from "react";

import { InputBase, Divider, Typography, IconButton } from "@mui/material";
import { Box, Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { type } from "@testing-library/user-event/dist/type";

export default function StatsWidget(props) {
  const { value, setValue, name, icon } = props;
  const [active, setActive] = useState(false);

  const handleChange = (e) => {
    let raw = e.target.value;
    if (raw && !isNaN(raw)) setValue(parseInt(raw));
  };
  const handleIncrement = () => {
    let val = parseInt(value);
    setValue(val + 1);
  };
  const handleDecrement = () => {
    let val = parseInt(value);
    if (val > 0) setValue(val - 1);
  };

  return (
    <Box
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      sx={{
        ...props.sx,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "8em",
        border: "1px solid lightgrey",
        borderRadius: "8px",
        paddingTop: "4px",
        boxShadow: "1px 1px 2px 1px #AAAAAA40",
      }}
    >
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={3} textAlign="right">
          {icon}
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Typography variant="body2">{name}</Typography>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Divider sx={{ width: "95%" }} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <IconButton disabled={!active} onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <InputBase
          value={value}
          inputProps={{ sx: { textAlign: "center" } }}
          onChange={handleChange}
        />
        <IconButton disabled={!active} onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

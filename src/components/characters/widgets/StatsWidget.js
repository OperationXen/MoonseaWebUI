import { useState } from "react";

import { InputBase, Divider, Typography, IconButton } from "@mui/material";
import { Box, Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function StatsWidget(props) {
  const { locked, value, setValue, name, icon, onMouseOut } = props;
  const [active, setActive] = useState(false);

  const handleChange = (e) => {
    let raw = e.target.value;
    if (locked || isNaN(raw)) return;

    if (raw) {
      let val = parseInt(raw);
      setValue(val);
    } else setValue(0);
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
      onMouseOut={() => {
        setActive(false);
        if (onMouseOut) onMouseOut();
      }}
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
        {!locked && (
          <IconButton disabled={!active} onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
        )}
        <InputBase
          disabled={locked}
          value={value}
          inputProps={{ sx: { textAlign: "center" } }}
          onChange={handleChange}
        />
        {!locked && (
          <IconButton disabled={!active} onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

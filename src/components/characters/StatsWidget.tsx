"use client";

import { useState, useEffect } from "react";

import { InputBase, Divider, Typography, IconButton } from "@mui/material";
import { Box, Grid } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type PropsType = {
  locked?: boolean;
  value: number;
  name: string;
  icon: any;
  allowNegative?: boolean;
  sx?: object;
  className?: string;
  setValue: (x: number) => void;
  onMouseOut?: () => void;
};

export function StatsWidget(props: PropsType) {
  const { locked = false, allowNegative = false, name, icon } = props;
  const { onMouseOut, setValue, value, sx, className } = props;

  const [active, setActive] = useState(false);
  const [text, setText] = useState(value?.toString());

  useEffect(() => {
    setText(value?.toString());
  }, [value, setText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (locked) return;

    setText(e.target.value);
  };

  const handleIncrement = () => {
    const num = parseInt(text) || 0;
    setText((num + 1).toString());
  };
  const handleDecrement = () => {
    const num = parseInt(text) || 0;

    if (num > 0 || allowNegative) setText((num - 1).toString());
  };

  const handleMouseOut = () => {
    let num = parseInt(text);

    if (Number.isNaN(num) || (num < 0 && !allowNegative)) {
      num = 0;
      setText("0");
    }

    setActive(false);
    if (num != value) setValue(num);
    if (onMouseOut) onMouseOut();
  };

  return (
    <Box
      onMouseOver={() => setActive(true)}
      onMouseLeave={handleMouseOut}
      className={className}
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "150px",
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
          value={text}
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

export default StatsWidget;

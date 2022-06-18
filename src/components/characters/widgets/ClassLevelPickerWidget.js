import { useEffect, useState } from "react";

import { IconButton, Typography, Grid, Divider } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import classes from "../../../config/classes.json";

export default function ClassLevelPickerWidget(props) {
  const [name, setName] = useState("");
  const [subClass, setSubClass] = useState("");
  const [value, setValue] = useState(1);
  const [subClasses, setSubClasses] = useState([]);

  useEffect(() => {
    setName(props.data.name);
    setSubClass(props.data.subclass);
    setValue(props.data.value);
  }, [props.data]);

  useEffect(() => {
    if (!name) return;

    let temp = classes.filter((item) => {
      return item.name === name;
    });
    setSubClasses(temp[0].subclasses);
  }, [name]);

  const handleClassChange = (e) => {
    let newVal = e.target.value;

    if (newVal === "delete") {
    } else {
      setName(newVal);
      setSubClass("");
    }
  };

  const handleDecrement = () => {
    if (value > 1) setValue(value - 1);
  };
  const handleIncrement = () => {
    if (value < 20) setValue(value + 1);
  };

  return (
    <Grid container sx={{ margin: "0.4em 0" }}>
      <Grid item xs={4}>
        <FormControl>
          <InputLabel>Character Class</InputLabel>
          <Select
            label="Character Class"
            sx={{ minWidth: "12em" }}
            value={name}
            onChange={handleClassChange}
          >
            {classes.map((item) => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>;
            })}
            <Divider />
            <MenuItem value="delete">Delete row</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <InputLabel>Subclass</InputLabel>
          <Select
            label="Subclass"
            sx={{ minWidth: "18em" }}
            disabled={!name}
            value={subClass}
            onChange={(e) => setSubClass(e.target.value)}
          >
            {subClasses.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
            <Divider />
            <MenuItem value="">No subclass</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleDecrement} disabled={value <= 1}>
          <RemoveIcon />
        </IconButton>
        <Typography>{value}</Typography>
        <IconButton onClick={handleIncrement} disabled={value >= 20}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

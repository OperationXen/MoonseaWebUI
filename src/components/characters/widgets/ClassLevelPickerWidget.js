import { useCallback } from "react";

import { IconButton, Typography, Grid, Divider } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import classes from "../../../config/classes.json";

export default function ClassLevelPickerWidget(props) {
  const { update, deletable, onDelete, data } = props;

  const getValidSubclasses = useCallback((className) => {
    if (!className) return [];

    let temp = classes.filter((item) => {
      return item.name === className;
    });
    return temp[0].subclasses;
  }, []);

  const setName = (newVal) => {
    update({ name: newVal, subclass: "", value: data.value });
  };
  const setSubclass = (newVal) => {
    update({ name: data.name, subclass: newVal, value: data.value });
  };
  const setValue = (newVal) => {
    update({ name: data.name, subclass: data.subclass, value: newVal });
  };

  const handleClassChange = (e) => {
    let newVal = e.target.value;

    if (newVal === "delete") {
      onDelete();
    } else {
      setName(newVal);
    }
  };

  const handleDecrement = () => {
    if (data.value > 1) setValue(data.value - 1);
  };
  const handleIncrement = () => {
    if (data.value < 20) setValue(data.value + 1);
  };

  return (
    <Grid container sx={{ margin: "0.4em 0" }}>
      <Grid item xs={4}>
        <FormControl>
          <InputLabel>Character Class</InputLabel>
          <Select
            label="Character Class"
            sx={{ minWidth: "12em" }}
            value={data.name}
            onChange={handleClassChange}
          >
            {classes.map((item, index) => {
              return (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              );
            })}
            <Divider />
            <MenuItem value="delete" disabled={!deletable}>
              Delete row
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <InputLabel>Subclass</InputLabel>
          <Select
            label="Subclass"
            sx={{ minWidth: "18em" }}
            disabled={!data.name}
            value={data.subclass}
            onChange={(e) => setSubclass(e.target.value)}
          >
            {getValidSubclasses(data.name).map((item, index) => {
              return (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              );
            })}
            <Divider />
            <MenuItem value="">No subclass</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleDecrement} disabled={data.value <= 1}>
          <RemoveIcon />
        </IconButton>
        <Typography>{data.value}</Typography>
        <IconButton onClick={handleIncrement} disabled={data.value >= 20}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

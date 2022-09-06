import { useCallback } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import { IconButton, Typography, Divider, Box } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import classes from "../../../config/classes.json";

export default function ClassLevelPickerWidget(props) {
  const { update, deletable, onDelete, data, highlight } = props;

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
    else onDelete();
  };
  const handleIncrement = () => {
    if (data.value < 20) setValue(data.value + 1);
  };

  return (
    <Grid container sx={{ margin: "0.4em 0", width: "100%" }} spacing="0.2em">
      <Grid item sm={4} xs={12}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Character Class</InputLabel>
          <Select
            label="Character Class"
            sx={{ width: "100%" }}
            value={data.name}
            onChange={handleClassChange}
            error={highlight && !data.name}
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
      <Grid item sm={6} xs={8}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Subclass</InputLabel>
          <Select
            label="Subclass"
            sx={{ width: "100%" }}
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
      <Grid
        item
        sm={2}
        xs={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0",
        }}
      >
        <Typography variant="caption" sx={{ opacity: "0.8" }}>
          Level
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-0.6em",
          }}
        >
          <IconButton onClick={handleDecrement}>
            {(data.value > 1 && <RemoveIcon />) || <DeleteIcon />}
          </IconButton>
          <Typography>{data.value}</Typography>
          <IconButton onClick={handleIncrement} disabled={data.value >= 20}>
            <AddIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

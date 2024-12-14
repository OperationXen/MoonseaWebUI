import React, { useCallback } from "react";

import { IconButton, Typography, Divider, Box } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import _classes from "@/config/classes.json";

import type { ClassOptions } from "@/types/classes";
import type { PlayerClass } from "@/types/character";

type PropsType = {
  update: (x: PlayerClass) => void;
  deletable?: boolean;
  onDelete?: () => void;
  data: PlayerClass;
  highlight?: boolean;
};

export default function ClassLevelPickerWidget(props: PropsType) {
  const { update, deletable, onDelete, data, highlight } = props;

  const classOptions = _classes as ClassOptions[];

  const getValidSubclasses = useCallback((className: string) => {
    if (!className) return [];

    let temp = classOptions.filter((item) => {
      return item.name === className;
    });
    return temp[0].subclasses;
  }, []);

  const setName = (newVal: string) => {
    update({ name: newVal, subclass: "", value: data.value });
  };
  const setSubclass = (newVal: string) => {
    update({ name: data.name, subclass: newVal, value: data.value });
  };
  const setvalue = (newvalue: number) => {
    update({ name: data.name, subclass: data.subclass, value: newvalue });
  };

  const handleClassChange = (e: SelectChangeEvent) => {
    let newVal = e.target.value;

    if (newVal === "delete" && onDelete) {
      onDelete();
    } else {
      setName(newVal);
    }
  };

  const handleDecrement = () => {
    if (data.value > 1) setvalue(data.value - 1);
    else if (onDelete) onDelete();
  };
  const handleIncrement = () => {
    if (data.value < 20) setvalue(data.value + 1);
  };

  return (
    <Box sx={{ margin: "0.4em 0", width: "100%", display: "flex", gap: "4px" }}>
      <FormControl sx={{ flexGrow: 2 }}>
        <InputLabel>Character Class</InputLabel>
        <Select
          label="Character Class"
          sx={{ width: "100%" }}
          value={data.name}
          onChange={handleClassChange}
          error={highlight && !data.name}
        >
          {classOptions.map((item, index) => {
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

      <FormControl sx={{ flexGrow: 2 }}>
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
      <Box
        sx={{
          flexGrow: 1,
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
          <IconButton onClick={handleDecrement}>{(data.value > 1 && <RemoveIcon />) || <DeleteIcon />}</IconButton>
          <Typography>{data.value}</Typography>
          <IconButton onClick={handleIncrement} disabled={data.value >= 20}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

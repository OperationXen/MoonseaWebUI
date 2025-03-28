"use client";

import { useCallback, useEffect, useState } from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DialogActions, Button, ButtonGroup } from "@mui/material";
import { Tooltip, Typography } from "@mui/material";

import ClassLevelPicker from "./classes/ClassLevelPicker";

import type { PlayerClass } from "@/types/character";

type PropsType = {
  open: boolean;
  onClose: () => void;
  initialClasses: PlayerClass[];
  update: (x: PlayerClass[]) => void;
};

export default function CharacterLevelEditDialog(props: PropsType) {
  const { open, onClose, initialClasses, update } = props;

  const [classes, setClasses] = useState(initialClasses);
  const [blankClasses, setBlankClasses] = useState(0);
  const [highlight, setHighlight] = useState(false);

  const calcBlankClasses = useCallback((data: PlayerClass[]) => {
    let blank = data.filter((x: PlayerClass) => !x.name).length;
    setBlankClasses(blank);
  }, []);

  useEffect(() => {
    calcBlankClasses(classes);
  }, [classes, calcBlankClasses]);

  const handleClose = () => {
    // If we have invalid classes, prevent save and close
    if (blankClasses) {
      setHighlight(true);
      return;
    }
    update(classes);
    onClose();
  };

  const handleAddClass = () => {
    setClasses(classes.concat([{ name: "", subclass: "", value: 1 }]));
  };

  const handleUpdate = (newVal: PlayerClass, index: number) => {
    let tempArray = [...classes];
    tempArray[index] = newVal;
    calcBlankClasses(tempArray);
    setClasses(tempArray);
  };

  const handleDelete = (index: number) => {
    let tempArray = [...classes];
    tempArray.splice(index, 1);
    calcBlankClasses(tempArray);
    setClasses(tempArray);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "1px solid black",
          boxShadow: `0 0 2px inset black`,
          display: "flex",
          width: "48em",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Typography fontSize={22}>Configure class levels</Typography>
      </DialogTitle>
      <DialogContent sx={{ width: "100%", padding: "12px" }}>
        {classes.map((existing, index) => {
          return (
            <ClassLevelPicker
              key={index}
              deletable={classes.length > 1 && index + 1 === classes.length}
              data={existing}
              update={(newVal) => handleUpdate(newVal, index)}
              onDelete={() => handleDelete(index)}
              highlight={highlight}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Tooltip
          title={blankClasses ? "Cannot have blank classes" : ""}
          placement="bottom"
        >
          <ButtonGroup>
            <Button
              variant="outlined"
              onClick={handleAddClass}
              disabled={!!blankClasses}
            >
              Add new class
            </Button>
            <Button onClick={handleClose} disabled={!!blankClasses}>
              Save changes
            </Button>
          </ButtonGroup>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}

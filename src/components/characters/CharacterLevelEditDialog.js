import { useCallback, useEffect, useState } from "react";

import { Typography, Dialog, Divider } from "@mui/material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";

import ClassLevelPickerWidget from "./widgets/ClassLevelPickerWidget";

export default function CharacterLevelEditDialog(props) {
  const { open, onClose, initialClasses, update } = props;
  const [classes, setClasses] = useState(initialClasses);
  const [blankClasses, setBlankClasses] = useState(0);
  const [highlight, setHighlight] = useState(false);

  const calcBlankClasses = useCallback((data) => {
    let blank = data.filter((x) => !x.name).length;
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

    console.log(classes);
    update(classes);
    onClose();
  };

  const handleAddClass = () => {
    setClasses(classes.concat([{ name: "", subclass: "", value: 1 }]));
  };

  const handleUpdate = (newVal, index) => {
    let tempArray = [...classes];
    tempArray[index] = newVal;
    calcBlankClasses(tempArray);
    setClasses(tempArray);
  };

  const handleDelete = (index) => {
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
      {classes.map((existing, index) => {
        return (
          <ClassLevelPickerWidget
            key={index}
            deletable={classes.length > 1 && index + 1 === classes.length}
            data={existing}
            update={(newVal) => handleUpdate(newVal, index)}
            onDelete={() => handleDelete(index)}
            highlight={highlight}
          />
        );
      })}
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
          <Button onClick={handleClose} disabled={blankClasses}>
            Save changes
          </Button>
        </ButtonGroup>
      </Tooltip>
    </Dialog>
  );
}

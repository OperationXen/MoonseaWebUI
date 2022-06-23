import { useState } from "react";
import { Typography, Dialog, Divider, Button } from "@mui/material";

import ClassLevelPickerWidget from "./widgets/ClassLevelPickerWidget";

export default function CharacterLevelEditDialog(props) {
  const { open, onClose, initialClasses, update } = props;
  const [classes, setClasses] = useState(initialClasses);

  const blankClasses = () => {
    return classes.filter((x) => !x.name).length;
  };

  const handleClose = () => {
    update(classes);
    onClose();
  };

  const handleUpdate = (newVal, index) => {
    let tempArray = classes;
    tempArray[index] = newVal;
    setClasses(tempArray);
  };

  const handleAddClass = () => {
    setClasses(classes.concat([{ name: "", subclass: "", value: 1 }]));
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
            deletable={!!index}
            data={existing}
            update={(newVal) => handleUpdate(newVal, index)}
          />
        );
      })}
      <Button
        variant="outlined"
        onClick={handleAddClass}
        disabled={blankClasses()}
      >
        Add new class
      </Button>
    </Dialog>
  );
}

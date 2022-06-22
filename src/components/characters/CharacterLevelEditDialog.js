import { Typography, Dialog, Divider, Button } from "@mui/material";

import ClassLevelPickerWidget from "./widgets/ClassLevelPickerWidget";

export default function CharacterLevelEditDialog(props) {
  const { open, onClose, classes, update } = props;

  const handleUpdate = (newVal, index) => {
    let tempArray = classes;
    tempArray[index] = newVal;
    update(tempArray);
  };

  const handleAddClass = () => {
    update(classes.concat([{ name: "", subclass: "", value: 1 }]));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      {classes &&
        classes.map((existing, index) => {
          return (
            <ClassLevelPickerWidget
              data={existing}
              update={(newVal) => handleUpdate(newVal, index)}
            />
          );
        })}
      <Button variant="outlined" onClick={handleAddClass}>
        Add new class
      </Button>
    </Dialog>
  );
}

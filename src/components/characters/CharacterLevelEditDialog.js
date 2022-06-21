import { Typography, Dialog, Divider, Button } from "@mui/material";

import { updateCharacter } from "../../api/character";
import ClassLevelPickerWidget from "./widgets/ClassLevelPickerWidget";

export default function CharacterLevelEditDialog(props) {
  const { open, onClose, data } = props;

  if (data) {
  }

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
      {data.map((existing) => {
        return <ClassLevelPickerWidget data={existing} />;
      })}
      <Button sx={{ width: "60%" }}>Update</Button>
    </Dialog>
  );
}

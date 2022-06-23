import React, { useState } from "react";

import { Box, Button } from "@mui/material";

import { updateCharacter } from "../../api/character";
import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";
import CharacterLevelEditDialog from "./CharacterLevelEditDialog";
import ClassChipWidget from "./widgets/ClassChipWidget";

export default function CharacterLevelsPane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [uuid, classes, setClasses] = useCharacterStore((s) => [
    s.uuid,
    s.classes,
    s.setClasses,
  ]);
  const [levelOpen, setLevelOpen] = useState(false);

  const handleEditClose = () => {
    setLevelOpen(false);
    updateCharacter(uuid, { classes: classes })
      .then(() => {
        displayMessage("Updated character classes and levels", "info");
      })
      .catch(() => "Error updating character classes", "error");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "3em",
        }}
      >
        {(classes &&
          classes.map((item) => {
            return (
              <ClassChipWidget data={item} onClick={() => setLevelOpen(true)} />
            );
          })) || (
          <Button onClick={() => setLevelOpen(true)}>
            Add a character class
          </Button>
        )}
      </Box>
      {levelOpen && (
        <CharacterLevelEditDialog
          open={levelOpen}
          onClose={handleEditClose}
          initialClasses={classes}
          update={setClasses}
        />
      )}
    </React.Fragment>
  );
}

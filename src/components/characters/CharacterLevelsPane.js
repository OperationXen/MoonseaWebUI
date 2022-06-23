import React, { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import CharacterLevelEditDialog from "./CharacterLevelEditDialog";
import ClassChipWidget from "./widgets/ClassChipWidget";

export default function CharacterLevelsPane(props) {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [levelOpen, setLevelOpen] = useState(false);
  const { classes, setClasses } = props;

  const handleEditClose = () => {
    setLevelOpen(false);
    displayMessage("Updated character classes and levels", "info");
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
      <CharacterLevelEditDialog
        open={levelOpen}
        onClose={handleEditClose}
        classes={classes}
        update={setClasses}
      />
    </React.Fragment>
  );
}

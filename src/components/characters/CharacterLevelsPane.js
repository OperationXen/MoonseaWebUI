import React, { useState } from "react";

import { Box, Button, Typography, Divider } from "@mui/material";

import { updateCharacter } from "../../api/character";
import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";
import CharacterLevelEditDialog from "./CharacterLevelEditDialog";
import ClassChipWidget from "./widgets/ClassChipWidget";

export default function CharacterLevelsPane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const uuid = useCharacterStore((s) => s.uuid);
  const [classes, setClasses] = useCharacterStore((s) => [
    s.classes,
    s.setClasses,
  ]);
  const setLevel = useCharacterStore((s) => s.setLevel);
  const [levelOpen, setLevelOpen] = useState(false);

  const handleEditClose = () => {
    setLevelOpen(false);
    updateCharacter(uuid, { classes: classes })
      .then((response) => {
        setLevel(response.data.level);
        displayMessage("Updated character classes and levels", "info");
      })
      .catch(() => "Error updating character classes", "error");
  };

  const getClassChips = () => {
    let retVal = [];

    if (classes) {
      retVal = classes.map((item) => {
        if (item.name)
          return (
            <ClassChipWidget data={item} onClick={() => setLevelOpen(true)} />
          );
        else return null;
      });
    }
    retVal = retVal.filter((x) => x !== null);
    if (retVal.length) return retVal;
    return (
      <Typography variant="caption" sx={{ opacity: 0.3 }}>
        Character has no class levels yet
      </Typography>
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box width="100%" mb={"0.4em"}>
          <Divider width="95%">
            <Button
              variant="outlined"
              onClick={() => setLevelOpen(true)}
              size="small"
              color="primary"
              sx={{ alignSelf: "center", cursor: "pointer" }}
            >
              Manage classes
            </Button>
          </Divider>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4em",
            minHeight: "3em",
          }}
        >
          {getClassChips()}
        </Box>
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

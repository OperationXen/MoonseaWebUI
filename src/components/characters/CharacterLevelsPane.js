import React, { useState } from "react";

import { Box, Button } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import CharacterLevelEditDialog from "./CharacterLevelEditDialog";
import ClassChipWidget from "./widgets/ClassChipWidget";

export default function CharacterLevelsPane(props) {
  const { data, setData } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [levelOpen, setLevelOpen] = useState(false);

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
        {(data &&
          data.map((item) => {
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
        data={data}
        update={setData}
      />
    </React.Fragment>
  );
}

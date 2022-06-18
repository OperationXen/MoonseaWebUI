import React, { useState } from "react";

import { Box, Button } from "@mui/material";

import CharacterLevelEditDialog from "./CharacterLevelEditDialog";
import ClassChipWidget from "./widgets/ClassChipWidget";

export default function CharacterLevelsPane(props) {
  const { data, setData } = props;
  const [levelOpen, setLevelOpen] = useState(false);

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
        onClose={() => setLevelOpen(false)}
        data={data}
      />
    </React.Fragment>
  );
}

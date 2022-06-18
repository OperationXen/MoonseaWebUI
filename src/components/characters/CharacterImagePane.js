import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

import { Box, Button } from "@mui/material";

import { uploadCharacterArtwork } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterImagePane(props) {
  const { characterData } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 0.5,
  });
  const [showControls, setShowControls] = useState(false);

  const getArtworkURL = () => {
    if (characterData.artwork) return "/media" + characterData.artwork;
    else return "/images/placegoblin.jpg";
  };

  //when file information set
  useEffect(() => {
    if (filesContent.length) {
      uploadCharacterArtwork(characterData.id, filesContent[0]).then(() =>
        displayMessage("Character artwork uploaded", "success")
      );
    }
  }, [filesContent]);

  return (
    <div
      style={{
        position: "relative",
        background: "black",
        textAlign: "center",
        width: "20em",
        height: "20em",
        overflow: "hidden",
        display: "flex",
      }}
      onMouseOver={() => setShowControls(true)}
      onMouseOut={() => setShowControls(false)}
    >
      {showControls && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            background: "black",
            opacity: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained">Show token</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" onClick={() => openFileSelector()}>
              Set artwork
            </Button>
            <Button variant="contained">Set token</Button>
          </div>
        </Box>
      )}
      <Box
        component="img"
        src={getArtworkURL()}
        sx={{
          objectFit: "cover",
          maxWidth: "20em",
        }}
      />
    </div>
  );
}

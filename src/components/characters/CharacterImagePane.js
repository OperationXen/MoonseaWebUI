import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

import { Box, Button } from "@mui/material";

import useCharacterStore from "../../datastore/character";
import { uploadCharacterImage } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterImagePane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 0.5,
  });
  const charData = useCharacterStore();
  const [showControls, setShowControls] = useState(false);
  const [showImage, setShowImage] = useState("artwork");
  const { artwork, token, setArtwork, setToken } = charData;

  const getArtworkURL = () => {
    if (artwork) return `${artwork}`;
    else return "/images/placegoblin.jpg";
  };
  const getTokenURL = () => {
    if (token) return `${token}`;
    else return "/images/placegoblin.jpg";
  };

  const handleImageChange = () => {
    if (showImage === "artwork") setShowImage("token");
    else setShowImage("artwork");
  };

  //when file information set
  useEffect(() => {
    if (filesContent.length) {
      uploadCharacterImage(charData.uuid, showImage, filesContent[0])
        .then((response) => {
          if (showImage === "artwork") {
            setArtwork(response.data.path);
          } else {
            setToken(response.data.path);
          }
          displayMessage(`Character ${showImage} uploaded`, "success");
        })
        .finally(() => {
          clear();
        });
    }
  }, [
    filesContent,
    charData,
    displayMessage,
    showImage,
    clear,
    setArtwork,
    setToken,
  ]);

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
            <Button variant="contained" onClick={handleImageChange}>
              {(showImage === "artwork" && "Show token") || "Show artwork"}
            </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="contained" onClick={() => openFileSelector()}>
              {`Set ${showImage}`}
            </Button>
          </div>
        </Box>
      )}

      {(showImage === "artwork" && (
        <Box
          component="img"
          src={getArtworkURL()}
          sx={{
            objectFit: "cover",
            maxWidth: "20em",
          }}
        />
      )) || (
        <Box
          component="img"
          src={getTokenURL()}
          sx={{
            objectFit: "cover",
            maxWidth: "20em",
          }}
        />
      )}
    </div>
  );
}

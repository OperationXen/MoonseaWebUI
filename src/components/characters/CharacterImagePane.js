import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

import { Box, Button } from "@mui/material";

import defaultArtwork from "../../media/images/placegoblin.jpg";
import defaultToken from "../../media/images/placegoblin-token.png";

import useCharacterStore from "../../datastore/character";
import { uploadCharacterImage } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterImagePane() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent, clear, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 0.8,
  });
  const charData = useCharacterStore();
  const [showControls, setShowControls] = useState(false);
  const [showImage, setShowImage] = useState("artwork");
  const { editable, artwork, token, setArtwork, setToken } = charData;

  const getArtworkURL = () => {
    if (artwork) return `${artwork}`;
    else return defaultArtwork;
  };
  const getTokenURL = () => {
    if (token) return `${token}`;
    else return defaultToken;
  };

  const handleImageChange = () => {
    if (showImage === "artwork") setShowImage("token");
    else setShowImage("artwork");
  };

  useEffect(() => {
    if (errors.length)
      displayMessage("Invalid image, maximum file size is 512kb", "warning");
  }, [errors, displayMessage]);

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
        justifyContent: "center",
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
          {editable && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="contained" onClick={() => openFileSelector()}>
                {`Set ${showImage}`}
              </Button>
            </div>
          )}
        </Box>
      )}

      <Box
        component="img"
        src={(showImage === "artwork" && getArtworkURL()) || getTokenURL()}
        sx={{
          objectFit: "contain",
          maxWidth: "20em",
        }}
      />
    </div>
  );
}

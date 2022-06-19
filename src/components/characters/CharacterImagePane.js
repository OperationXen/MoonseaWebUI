import React, { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

import { Box, Button } from "@mui/material";

import { uploadCharacterImage } from "../../api/character";
import useSnackbar from "../../datastore/snackbar";

export default function CharacterImagePane(props) {
  const { characterData } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 0.5,
  });
  const [showControls, setShowControls] = useState(false);
  const [artworkURL, setArtworkURL] = useState("");
  const [tokenURL, setTokenURL] = useState("");
  const [showImage, setShowImage] = useState("artwork");

  const getArtworkURL = () => {
    if (artworkURL) return `${artworkURL}`;
    else return "/images/placegoblin.jpg";
  };
  const getTokenURL = () => {
    if (tokenURL) return `${tokenURL}`;
    else return "/images/placegoblin.jpg";
  };

  const handleImageChange = () => {
    if (showImage === "artwork") setShowImage("token");
    else setShowImage("artwork");
  };

  useEffect(() => {
    setTokenURL(characterData.token);
    setArtworkURL(characterData.artwork);
  }, [characterData]);

  //when file information set
  useEffect(() => {
    if (filesContent.length) {
      uploadCharacterImage(characterData.id, showImage, filesContent[0]).then(
        (response) => {
          if (showImage === "artwork") {
            setArtworkURL(response.data.path);
          } else {
            setTokenURL(response.data.path);
          }
          displayMessage(`Character ${showImage} uploaded`, "success");
        }
      );
    }
  }, [filesContent, characterData, displayMessage, showImage]);

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

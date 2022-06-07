import React, { useState } from "react";
import { Box, Button } from "@mui/material";

export default function CharacterImagePane(props) {
  const { characterData } = props;

  const [showControls, setShowControls] = useState(false);

  const getArtworkURL = () => {
    if (characterData.artwork) return "/media" + characterData.artwork;
    else return "/images/placegoblin.jpg";
  };

  return (
    <div
      style={{
        margin: "auto",
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
            <Button variant="contained">Set artwork</Button>
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

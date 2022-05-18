import React, { useState } from "react";
import { Box, Button } from "@mui/material";

export default function CharacterImagePane(props) {
  const { characterData } = props;

  const [showControls, setShowControls] = useState(false);
  
  const getArtworkURL = () => {
    if(characterData.artwork) return "/media" + characterData.artwork;
    else return "/images/placegoblin.jpg"
  }

  return (
    <div
      style={{
        margin: "auto",
        position: "relative",
        background: "black",
        height: "20em",
        maxWidth: "26em"
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
            alignContent: "center"
          }}
        >
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button variant="outlined">Show token</Button>
          </div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <Button variant="outlined">Set artwork</Button>  
            <Button variant="outlined">Set token</Button> 
          </div>
        </Box>
      )}
      <Box
        component="img"
        src={getArtworkURL()}
        sx={{
          maxHeight: "20em",
          objectFit: "cover",
          maxWidth: "26em"
        }}
      />
    </div>
  );
}

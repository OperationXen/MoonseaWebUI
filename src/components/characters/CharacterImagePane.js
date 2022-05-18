import React, { useState } from "react";
import { Box } from "@mui/material";

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
        textAlign: "center",
        height: "20em",
        width: "26em"
        
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
            opacity: "70%"
          }}
        >
          Pew pew
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

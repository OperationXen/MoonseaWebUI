import React, { useState, useRef } from "react";
import { Box } from "@mui/material";

export default function CharacterImagePane(props) {
  const { characterData } = props;
  const parentRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);

  const handeMouseOver = (e) => {
    const parent = parentRef.current.getBoundingClientRect();
    setLeft(parent.left);
    setRight(parent.left + parent.width);
    setShowControls(true);
  };

  return (
    <div
      ref={parentRef}
      style={{
        background: "black",
        textAlign: "center",
      }}
      onMouseOver={handeMouseOver}
      onMouseOut={() => setShowControls(false)}
    >
      {showControls && (
        <Box
          sx={{
            position: "absolute",
            left: left,
            right: right,
            background: " red",
          }}
        >
          Pew pew
        </Box>
      )}
      <Box
        component="img"
        src={"/media" + characterData.artwork}
        sx={{ maxHeight: "20em" }}
      />
    </div>
  );
}

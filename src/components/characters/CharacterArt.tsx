import { useState } from "react";

import Image from "next/image";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Zoom, Fab, Tooltip } from "@mui/material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import { Character } from "@/types/character";

type ImageTypes = "art" | "token";
type PropsType = {
  character: Character;
  updateCharacter: (x: Partial<Character>) => Promise<any>;
};

export function CharacterArt(props: PropsType) {
  const { character } = props;

  const [show, setShow] = useState<ImageTypes>("token");
  const [active, setActive] = useState(false);

  const getImageLink = () => {
    if (character.token && show === "token") return character.token;
    if (character.artwork && show === "art") return character.artwork;
    return "";
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid black",
        borderRight: "1px solid black",

        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "256px",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {(getImageLink() && <Image src={getImageLink()} alt={`${character.name}-${show}`} />) || (
          <Typography>Image not set</Typography>
        )}
      </Box>
      <ButtonGroup color="inherit" size="small" variant="text" fullWidth>
        <Button onClick={() => setShow("art")} sx={{ paddingY: "1px", opacity: show === "art" ? 1 : 0.2 }}>
          Artwork
        </Button>
        <Button onClick={() => setShow("token")} sx={{ paddingY: "1px", opacity: show === "token" ? 1 : 0.2 }}>
          Token
        </Button>
      </ButtonGroup>

      <Zoom in={active}>
        <Tooltip title="Upload image">
          <Fab size="small" sx={{ position: "absolute", right: "4px", top: "4px" }}>
            <FileUploadIcon />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom in={active && getImageLink() !== ""}>
        <Tooltip title="Copy link to this image">
          <Fab size="small" sx={{ position: "absolute", left: "4px", top: "4px" }}>
            <ContentCopyIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </Box>
  );
}

export default CharacterArt;

import { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";

import Image from "next/image";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Zoom, Fab, Tooltip } from "@mui/material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import { uploadCharacterImage } from "@/api/character";
import useSnackbar from "@/datastore/snackbar";

import { Character } from "@/types/character";

type ImageTypes = "artwork" | "token";
type PropsType = {
  character: Character;
  updateCharacter: (x: Partial<Character>) => Promise<any>;
};

export function CharacterArt(props: PropsType) {
  const { character, updateCharacter } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent, clear, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 0.8,
  });
  const [show, setShow] = useState<ImageTypes>("token");
  const [active, setActive] = useState(false);

  const getImageLink = () => {
    if (character.token && show === "token") return character.token;
    if (character.artwork && show === "artwork") return character.artwork;
    return "";
  };

  //when file information set
  useEffect(() => {
    if (filesContent.length) {
      uploadCharacterImage(character.uuid, show, filesContent[0])
        .then((response) => {
          if (show === "artwork") updateCharacter({ artwork: response.data.path });
          else updateCharacter({ token: response.data.path });
          displayMessage(`${response.data.message}`, "success");
        })
        .finally(() => {
          clear();
        });
    }
  }, [filesContent, character.uuid, displayMessage, show, clear]);

  // when an error occurs with file upload
  useEffect(() => {
    if (errors.length) {
      if (errors[0].fileSizeToolarge) displayMessage(`Failed to upload, file is too big`, "error");
    }
  }, [errors]);

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
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingY: "4px",
          height: 256,
        }}
      >
        {(getImageLink() && (
          <Image src={getImageLink()} alt={`${character.name}-${show}`} width={242} height={242} />
        )) || (
          <Typography sx={{ opacity: "30%" }}>{`${show === "token" ? "Token" : "Artwork"} image not set`}</Typography>
        )}
      </Box>
      <ButtonGroup color="inherit" size="small" variant="text" fullWidth>
        <Button onClick={() => setShow("artwork")} sx={{ paddingY: "1px", opacity: show === "artwork" ? 1 : 0.2 }}>
          Artwork
        </Button>
        <Button onClick={() => setShow("token")} sx={{ paddingY: "1px", opacity: show === "token" ? 1 : 0.2 }}>
          Token
        </Button>
      </ButtonGroup>

      <Zoom in={active}>
        <Tooltip title="Upload image">
          <Fab size="small" sx={{ position: "absolute", right: "4px", top: "4px" }} onClick={openFileSelector}>
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

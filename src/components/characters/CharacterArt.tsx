"use client";

import { useState, useEffect } from "react";
import { useFilePicker } from "use-file-picker";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Zoom, Fab, Tooltip } from "@mui/material";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";

import { uploadCharacterImage } from "@/data/fetch/character-image";
import useSnackbar from "@/datastore/snackbar";

import type { Character, CharacterImageType } from "@/types/character";

type PropsType = {
  character: Character;
  refreshCharacter: () => void;
};

export function CharacterArt(props: PropsType) {
  const { character, refreshCharacter } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [openFileSelector, { filesContent, clear, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 1.2,
  });

  const [show, setShow] = useState<CharacterImageType>(
    character.artwork ? "artwork" : "token",
  );
  const [active, setActive] = useState(false);

  const getImageLink = () => {
    if (character.token && show === "token") return character.token;
    if (character.artwork && show === "artwork") return character.artwork;
    return "";
  };

  const copyImageLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.host}${show === "artwork" ? character.artwork : character.token}`,
    );
    displayMessage("Link to image copied to clipboard", "info");
  };

  //when file information set
  useEffect(() => {
    if (filesContent.length) {
      uploadCharacterImage(character.uuid, show, filesContent[0])
        .then((response) => {
          refreshCharacter();
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
      if (errors[0].fileSizeToolarge)
        displayMessage(
          `Failed to upload, file is too big - max size 1 Mbit`,
          "error",
        );
    }
  }, [errors]);

  return (
    <Box
      sx={{
        borderRight: "1px solid black",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
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
          height: 256,
          width: 256,
        }}
      >
        {(getImageLink() && (
          <Box
            component="img"
            sx={{
              height: 262,
              width: 262,
            }}
            src={getImageLink()}
            alt={`${character.name}-${show}`}
          />
        )) || (
            <Typography
              sx={{ opacity: "30%" }}
            >{`${show === "token" ? "Token" : "Artwork"} image not set`}</Typography>
          )}
      </Box>
      <ButtonGroup color="inherit" size="small" variant="text" fullWidth>
        <Button
          onClick={() => setShow("artwork")}
          sx={{
            paddingY: "1px",
            opacity: show === "artwork" ? 1 : 0.2,
          }}
        >
          Artwork
        </Button>
        <Button
          onClick={() => setShow("token")}
          sx={{
            paddingY: "1px",
            opacity: show === "token" ? 1 : 0.2,
          }}
        >
          Token
        </Button>
      </ButtonGroup>

      <Zoom in={active}>
        <Tooltip title="Upload image">
          <Fab
            size="small"
            sx={{ position: "absolute", right: "4px", top: "4px" }}
            onClick={openFileSelector}
          >
            <FileUploadIcon />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom in={active && getImageLink() !== ""}>
        <Tooltip title="Copy link to this image">
          <Fab
            size="small"
            sx={{ position: "absolute", left: "4px", top: "4px" }}
            onClick={copyImageLinkToClipboard}
          >
            <ContentCopyIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </Box>
  );
}

export default CharacterArt;

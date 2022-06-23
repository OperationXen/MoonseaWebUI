import { Box, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

export default function CharacterControls(props) {
  return (
    <Box
      sx={{
        width: "3em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        background: "#AAAAAA70",
        borderRadius: "8px",
      }}
    >
      <IconButton onClick={() => props.onEditClicked()}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => {
          props.onDeleteClicked();
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton disabled>
        <ContentCopyIcon fontSize="small" />
      </IconButton>
      <IconButton disabled>
        <ShareIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

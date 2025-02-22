import React from "react";

import { Dialog, Box, Typography } from "@mui/material";

import GameEventPane from "./character_event_panes/GameEventPane";

import type { UUID } from "@/types/uuid";
import type { AnyEvent, GameEvent } from "@/types/events";

type PropsType = {
  characterUUID: UUID;
  event: AnyEvent | undefined;
  onClose: () => void;
};

export function EditEvent(props: PropsType) {
  const { characterUUID, event, onClose } = props;

  return (
    <Dialog
      open={!!event}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: "2px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px black",
          padding: "1.2em",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        {"Edit existing event"}
      </Typography>
      <Box>
        {event?.event_type === "game" && (
          <GameEventPane
            existingGame={event as GameEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
      </Box>
    </Dialog>
  );
}

export default EditEvent;

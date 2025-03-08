import React from "react";

import { Dialog, DialogTitle, Typography, DialogContent } from "@mui/material";

import DTEventSpellBookUpdate from "./character_event_panes/DTEventSpellbookUpdate";
import DTEventMundaneTrade from "./character_event_panes/DTEventMundaneTrade";
import DTEventFreeForm from "./character_event_panes/DTEventFreeForm";
import DTEventCatchup from "./character_event_panes/DTEventCatchup";
import GameEventPane from "./character_event_panes/GameEventPane";
import { getEventName } from "@/utils/events";

import type { UUID } from "@/types/uuid";
import type { MundaneTradeEvent, FreeFormEvent } from "@/types/events";
import type { SpellBookUpdateEvent } from "@/types/events";
import type { AnyEvent, GameEvent, CatchingUpEvent } from "@/types/events";

type PropsType = {
  characterUUID: UUID;
  event: AnyEvent | undefined;
  onClose: () => void;
};

export function CharacterEventModal(props: PropsType) {
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
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5">{getEventName(event)}</Typography>
      </DialogTitle>

      <DialogContent>
        {event?.event_type === "game" && (
          <GameEventPane
            existingGame={event as GameEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_freeform" && (
          <DTEventFreeForm
            existingEvent={event as FreeFormEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_mtrade" && (
          <DTEventMundaneTrade
            existingEvent={event as MundaneTradeEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_catchingup" && (
          <DTEventCatchup
            existingEvent={event as CatchingUpEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_sbookupd" && (
          <DTEventSpellBookUpdate
            existingEvent={event as SpellBookUpdateEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CharacterEventModal;

import React from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import DTEventSpellBookUpdate from "./character_event_panes/DTEventSpellbookUpdate";
import DTEventMerchantVisit from "./character_event_panes/DTEventMerchantVisit";
import DTEventCatchingUp from "./character_event_panes/DTEventCatchingUp";
import DTEventFreeForm from "./character_event_panes/DTEventFreeForm";
import GameEventPane from "./character_event_panes/GameEventPane";
import { getEventName } from "@/utils/events";

import type { UUID } from "@/types/uuid";
import type { FreeFormEvent } from "@/types/events";
import type { SpellBookUpdateEvent } from "@/types/events";
import type { AnyEvent, GameEvent } from "@/types/events";
import DTEventBastionTurn from "./character_event_panes/DTEventBastionTurn";

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
      <DialogTitle>{getEventName(event)}</DialogTitle>

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
            event={event as FreeFormEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_mtrade" && (
          <DTEventMerchantVisit
            event={event as FreeFormEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_catchingup" && (
          <DTEventCatchingUp
            event={event as FreeFormEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_sbookupd" && (
          <DTEventSpellBookUpdate
            event={event as SpellBookUpdateEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
        {event?.event_type === "dt_bastion" && (
          <DTEventBastionTurn
            event={event as FreeFormEvent}
            characterUUID={characterUUID}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CharacterEventModal;

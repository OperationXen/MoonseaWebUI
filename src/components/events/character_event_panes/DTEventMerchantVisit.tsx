"use client";

import { useState } from "react";

import { GiTwoCoins, GiBed } from "react-icons/gi";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, Box, Button, Divider } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";
import { useCharacter } from "@/data/fetch/character";
import { useConsumables } from "@/data/fetch/items/consumables";

import ConsumableItem from "@/components/items/consumables/ConsumableItem";
import StatsWidget from "@/components/characters/StatsWidget";
import CreateConsumableDialog from "@/components/items/consumables/CreateConsumableDialog";

import type { UUID } from "@/types/uuid";
import type { FreeFormEvent } from "@/types/events";
import type { Consumable, PredefConsumable } from "@/types/items";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  event?: FreeFormEvent;
};

export function DTEventMerchantVisit(props: PropsType) {
  const { onClose, characterUUID, event: event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent, updateEvent } = useEvents(characterUUID);
  const { refreshCharacter } = useCharacter(characterUUID);
  const { createConsumable } = useConsumables(characterUUID);

  const [autoApply, setAutoApply] = useState(true);
  const [title, setTitle] = useState(event ? event.title : "Visited Merchant");
  const [details, setDetails] = useState(event ? event.details : "");
  const [gold, setGold] = useState(event ? event.gold_change : 0);
  const [downtime, setDowntime] = useState(event ? event.downtime_change : 0);
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

  const [consumablesOpen, setConsumablesOpen] = useState(false);
  const [consumables, setConsumables] = useState<Consumable[]>([]);

  const editable = event ? event.editable : true;
  const isNewEvent = !event;

  const handleSubmit = () => {
    const data = {
      event_type: "dt_freeform",
      title: title,
      details: details,
      gold_change: gold,
      downtime_change: downtime,
      auto_apply: autoApply,
      datetime: datetime ?? undefined,
    } as FreeFormEvent;

    if (isNewEvent) {
      createEvent(data)
        .then(() => {
          if (autoApply) refreshCharacter();
          displayMessage("Generic event added to log", "success");
          onClose && onClose();
        })
        .catch((error) => {
          displayMessage(error.response.data.message, "error");
        });
      consumables.map((c) => {
        createConsumable(c);
      });
    } else {
      updateEvent({ ...event, ...data })
        .then(() => {
          displayMessage(`Updated event "${title}"`, "success"),
            onClose && onClose();
        })
        .catch((error) => displayMessage(error.response.data.message, "error"));
    }
  };

  const makeConsumable = (c: PredefConsumable) => {
    return { ...c, equipped: false, uuid: "0-0-0-0-0" } as Consumable;
  };

  const handleAddPreDefConsumable = (c: PredefConsumable) => {
    setGold(gold - c.cost);
    setDetails([details, c.name].join(details ? ", " : ""));
    setConsumables([...consumables, makeConsumable(c)]);
    setConsumablesOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4em",
        marginTop: "8px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date"
          format="yyyy/MM/dd"
          value={datetime}
          onChange={setDatetime}
          disabled={!editable}
        />
      </LocalizationProvider>

      <TextField
        value={title}
        label="Title"
        disabled={!editable}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Visited merchant"
        size="small"
        required
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <StatsWidget
          value={gold}
          setValue={setGold}
          name="Gold"
          icon={<GiTwoCoins />}
          allowNegative
        />
        <Box>
          <FormControlLabel
            label="Apply changes to character"
            labelPlacement="top"
            control={
              <Checkbox
                checked={autoApply}
                onChange={() => setAutoApply(!autoApply)}
                disabled={!isNewEvent}
              />
            }
          />
        </Box>
        <StatsWidget
          value={downtime}
          setValue={setDowntime}
          name="Downtime"
          icon={<GiBed />}
          allowNegative
        />
      </Box>

      {consumables.length > 0 && <Divider>Consumable items</Divider>}
      {consumables.map((c) => {
        return (
          <ConsumableItem
            item={c}
            editable={false}
            onChange={() => {}}
            onDelete={() => {}}
          />
        );
      })}
      {isNewEvent && (
        <Button variant="outlined" onClick={() => setConsumablesOpen(true)}>
          Add consumable items
        </Button>
      )}
      <TextField
        value={details}
        label="Other Details (Optional)"
        disabled={!editable}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Add any other details here"
        multiline
        minRows={2}
        maxRows={6}
      />

      {editable && (
        <Button
          variant="contained"
          disabled={!title}
          sx={{ width: "60%", margin: "auto" }}
          onClick={handleSubmit}
        >
          {isNewEvent ? "Create event" : "Update event"}
        </Button>
      )}

      <CreateConsumableDialog
        open={consumablesOpen}
        onClose={(e) => {
          setConsumablesOpen(false);
          e.stopPropagation();
        }}
        addItem={handleAddPreDefConsumable}
      />
    </Box>
  );
}

export default DTEventMerchantVisit;

"use client";

import { useState } from "react";

import { GiTwoCoins, GiBed } from "react-icons/gi";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField, Box, Button } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";
import { useCharacter } from "@/data/fetch/character";
import StatsWidget from "@/components/characters/StatsWidget";

import type { UUID } from "@/types/uuid";
import type { FreeFormEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  event?: FreeFormEvent;
};

export function DTEventBastionTurn(props: PropsType) {
  const { onClose, characterUUID, event: event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent, updateEvent } = useEvents(characterUUID);
  const { refreshCharacter } = useCharacter(characterUUID);

  const [autoApply, setAutoApply] = useState(true);
  const [title, setTitle] = useState(event ? event.title : "Bastion turn");
  const [details, setDetails] = useState(event ? event.details : "");
  const [gold, setGold] = useState(event ? event.gold_change : 0);
  const [downtime, setDowntime] = useState(event ? event.downtime_change : -7);
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

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
          displayMessage("Bastion event added to log", "success");
          onClose && onClose();
        })
        .catch((error) => {
          displayMessage(error.response.data.message, "error");
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
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
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>

      <TextField
        value={title}
        label="Title"
        size="small"
        disabled={!editable}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Generic event"
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

      <TextField
        value={details}
        label="Details (Optional)"
        disabled={!editable}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Add details of your event here"
        multiline
        minRows={5}
        maxRows={12}
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
    </Box>
  );
}

export default DTEventBastionTurn;

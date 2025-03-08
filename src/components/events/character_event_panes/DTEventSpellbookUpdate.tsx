"use client";

import { ChangeEvent, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Button, TextField, InputAdornment } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { GiTwoCoins, GiBed } from "react-icons/gi";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";
import type { SpellBookUpdateEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  downtime?: number;
  event?: SpellBookUpdateEvent;
};

export function DTEventSpellBookUpdate(props: PropsType) {
  const { onClose, downtime: dtAvailable, characterUUID, event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent } = useEvents(characterUUID);

  const [gold, setGold] = useState(event ? event.gold_change : 0);
  const [downtime, setDowntime] = useState(event ? event.downtime : 0);
  const [dmName, setDMName] = useState(event ? event.dm_name : "");
  const [sourceChar, setSourceChar] = useState(event ? event.source : "");
  const [text, setText] = useState(event ? event.spellsText : "");
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

  const editable = event ? event.editable : true;

  const handleSubmit = () => {
    createEvent({
      event_type: "dt_sbookupd",
      gold_change: gold,
      downtime: downtime,
      dm_name: dmName,
      source: sourceChar,
      spellsText: text,
    } as SpellBookUpdateEvent)
      .then((_response) => {
        displayMessage("Spellbook update added to log", "success");
        onClose && onClose();
      })
      .catch((error) => {
        displayMessage(
          error.response.data.message ?? "Error creating event",
          "error",
        );
      });
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <TextField
          label="Gold"
          sx={{ flexGrow: 1 }}
          value={gold}
          disabled={!editable}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (parseInt(e.target.value) >= 0)
              setGold(parseInt(e.target.value));
          }}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GiTwoCoins />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Downtime days"
          sx={{ flexGrow: 1 }}
          value={downtime}
          disabled={!editable}
          onChange={(e) => {
            if (parseInt(e.target.value) >= 0)
              setDowntime(parseInt(e.target.value));
          }}
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GiBed />
              </InputAdornment>
            ),
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Event date"
            format="yyyy/MM/dd"
            value={datetime}
            onChange={setDatetime}
            disabled={!editable}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em" }}>
        <TextField
          fullWidth
          label="DM Name (optional)"
          placeholder="Presiding DM"
          value={dmName}
          disabled={!editable}
          onChange={(e) => setDMName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Source Character (optional)"
          placeholder="Character you copied from"
          value={sourceChar}
          disabled={!editable}
          onChange={(e) => setSourceChar(e.target.value)}
        />
      </Box>
      <TextField
        fullWidth
        label="Details"
        placeholder="Add details of spells copied to your spellbook here"
        value={text}
        disabled={!editable}
        onChange={(e) => setText(e.target.value)}
        multiline
        minRows={4}
        maxRows={6}
      />

      <Button
        variant="contained"
        sx={{ width: "60%", margin: "auto" }}
        disabled={
          !editable ||
          !text ||
          gold <= 0 ||
          downtime <= 0 ||
          !dtAvailable ||
          downtime > dtAvailable
        }
        onClick={handleSubmit}
      >
        Add Spellbook Update
      </Button>
    </Box>
  );
}

export default DTEventSpellBookUpdate;

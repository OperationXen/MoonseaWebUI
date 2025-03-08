"use client";

import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, Typography, Button } from "@mui/material";
import { Switch, TextField, InputAdornment } from "@mui/material";

import { GiTwoCoins } from "react-icons/gi";

import useSnackbar from "@/data/store/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";
import type { MundaneTradeEvent } from "@/types/events";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
  event?: MundaneTradeEvent;
};

export function DTEventMundaneTrade(props: PropsType) {
  const { onClose, characterUUID, event } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent, updateEvent } = useEvents(characterUUID);

  const [gold, setGold] = useState(event ? event.gold_change : 0);
  const [profit, setProfit] = useState(event ? event.gold_change > 0 : false);
  const [sold, setSold] = useState(event ? event.sold : "");
  const [purchased, setPurchased] = useState(event ? event.purchased : "");
  const [datetime, setDatetime] = useState<Date | null>(
    event ? new Date(event.datetime) : new Date(),
  );

  const editable = event ? event.editable : true;
  const isNewEvent = !event;

  const handleSubmit = () => {
    let goldChange = gold * (profit ? 1 : -1);

    const data = {
      event_type: "dt_mtrade",
      gold_change: goldChange,
      sold: sold,
      purchased: purchased,
    } as MundaneTradeEvent;
    if (isNewEvent) {
      createEvent(data)
        .then(() => {
          displayMessage("Merchant trade added to log", "success");
          onClose && onClose();
        })
        .catch((error) => displayMessage(error.response.data.message, "error"));
    } else {
      updateEvent({ ...event, ...data })
        .then(() => {
          displayMessage("Updated merchant trade event", "success");
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
        gap: "0.4em",
        marginTop: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Gold"
          sx={{ width: "30%" }}
          value={gold}
          onChange={(e) => setGold(parseInt(e.target.value))}
          type="number"
          disabled={!editable}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GiTwoCoins />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography sx={{ opacity: profit ? 0.3 : 1 }}>Spent</Typography>
          <Switch
            disabled={!editable}
            checked={profit}
            onChange={(e) => setProfit(e.target.checked)}
          />
          <Typography sx={{ opacity: profit ? 1 : 0.3 }}>Profit</Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Event date"
            format="yyyy/MM/dd"
            value={datetime}
            disabled={!editable}
            onChange={setDatetime}
          />
        </LocalizationProvider>
      </Box>
      <TextField
        fullWidth
        label="Items sold"
        value={sold}
        disabled={!editable}
        onChange={(e) => setSold(e.target.value)}
        multiline
        minRows={2}
        maxRows={5}
      />
      <TextField
        fullWidth
        label="Items purchased"
        value={purchased}
        disabled={!editable}
        onChange={(e) => setPurchased(e.target.value)}
        multiline
        minRows={2}
        maxRows={5}
      />

      {editable && (
        <Button
          variant="contained"
          disabled={!purchased && !sold}
          sx={{ width: "60%", margin: "auto" }}
          onClick={handleSubmit}
        >
          {isNewEvent ? "Add merchant visit" : "Update event"}
        </Button>
      )}
    </Box>
  );
}

export default DTEventMundaneTrade;

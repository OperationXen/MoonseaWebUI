"use client";

import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Typography, Button, Stack } from "@mui/material";
import { Switch, TextField, Divider, InputAdornment } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { GiTwoCoins } from "react-icons/gi";

import useSnackbar from "@/datastore/snackbar";
import { useEvents } from "@/data/fetch/events/character";

import type { UUID } from "@/types/uuid";

type PropsType = {
  onClose: () => void;
  characterUUID: UUID;
};

export default function CreateDTMundaneTrade(props: PropsType) {
  const { onClose, characterUUID } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent } = useEvents(characterUUID);

  const [date, setDate] = useState<Date | null>(new Date());
  const [gold, setGold] = useState(0);
  const [profit, setProfit] = useState(false);
  const [sold, setSold] = useState("");
  const [purchased, setPurchased] = useState("");

  const handleSubmit = () => {
    let goldChange = gold * (profit ? 1 : -1);

    createEvent({
      event_type: "dt_mtrade",
      gold_change: goldChange,
      sold: sold,
      purchased: purchased,
    })
      .then((_response) => {
        displayMessage("Merchant trade added to log", "success");
        onClose && onClose();
      })
      .catch(() => displayMessage("Error creating event", "error"));
  };

  return (
    <Stack sx={{ gap: "0.4em" }}>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Merchant Visit Details</Typography>
      </Divider>

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
            checked={profit}
            onChange={(e) => setProfit(e.target.checked)}
          />
          <Typography sx={{ opacity: profit ? 1 : 0.3 }}>Profit</Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Event date"
            format="yyyy/MM/dd"
            value={date}
            onChange={setDate}
          />
        </LocalizationProvider>
      </Box>
      <TextField
        fullWidth
        label="Items sold"
        value={sold}
        onChange={(e) => setSold(e.target.value)}
        multiline
        minRows={2}
        maxRows={5}
      />
      <TextField
        fullWidth
        label="Items purchased"
        value={purchased}
        onChange={(e) => setPurchased(e.target.value)}
        multiline
        minRows={2}
        maxRows={5}
      />

      <Button
        variant="contained"
        sx={{ width: "60%", margin: "auto" }}
        disabled={!sold && !purchased}
        onClick={handleSubmit}
      >
        Add merchant visit
      </Button>
    </Stack>
  );
}

import { useState } from "react";

import { GiTwoCoins, GiBed } from "react-icons/gi";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, TextField, Button } from "@mui/material";

import StatsWidget from "@/components/characters/StatsWidget";

import type { DMRewardEvent } from "@/types/events";

type PropsType = {
  event?: DMRewardEvent;
  onClose: () => void;
};

export function DMEventReward(props: PropsType) {
  const { event, onClose } = props;

  const [name, setName] = useState(event ? event.name : "");
  const [gold, setGold] = useState(event ? event.gold : 0);
  const [downtime, setDowntime] = useState(event ? event.downtime : 0);
  const [datetime, setDatetime] = useState(
    event ? new Date(event.datetime) : null,
  );

  const editable = event?.editable;

  const handleSubmit = () => {
    onClose && onClose();
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
        value={name}
        label="Reward Name"
        disabled={!editable}
        onChange={(e) => setName(e.target.value)}
        required
        size="small"
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <StatsWidget
          value={gold}
          setValue={setGold}
          name="Gold"
          icon={<GiTwoCoins />}
          allowNegative
          locked={!editable}
        />

        <StatsWidget
          value={downtime}
          setValue={setDowntime}
          name="Downtime"
          icon={<GiBed />}
          allowNegative
          locked={!editable}
        />
      </Box>

      {editable && (
        <Button
          variant="contained"
          disabled={!name}
          sx={{ width: "60%", margin: "auto" }}
          onClick={handleSubmit}
        >
          Update DM Reward
        </Button>
      )}
    </Box>
  );
}

export default DMEventReward;

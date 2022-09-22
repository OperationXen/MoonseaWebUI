import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Typography, Button, Stack } from "@mui/material";
import { Switch, TextField, Divider, InputAdornment } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { GiTwoCoins } from "react-icons/gi";

import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";
import { createEventMundaneTrade } from "../../../api/events";

export default function CreateMundaneTrade(props) {
  const { onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const characterUUID = useCharacterStore((s) => s.uuid);
  const requestCharacterRefresh = useCharacterStore((s) => s.requestRefresh);

  const [date, setDate] = useState(new Date());
  const [gold, setGold] = useState(0);
  const [profit, setProfit] = useState(false);
  const [sold, setSold] = useState("");
  const [purchased, setPurchased] = useState("");

  const handleSubmit = () => {
    let goldChange = gold * (profit ? 1 : -1);

    createEventMundaneTrade(characterUUID, goldChange, sold, purchased)
      .then((response) => {
        displayMessage("Merchant trade added to log", "success");
        requestCharacterRefresh();
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
          onChange={(e) => setGold(e.target.value)}
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
            inputFormat="yyyy/MM/dd"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ maxWidth: "30%" }} />
            )}
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

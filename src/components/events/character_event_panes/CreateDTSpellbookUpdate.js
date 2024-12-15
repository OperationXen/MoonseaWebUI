import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Typography, Button, Stack } from "@mui/material";
import { TextField, Divider, InputAdornment } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { GiTwoCoins, GiBed } from "react-icons/gi";

import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";
import { createEventSpellbookUpdate } from "../../../api/events";

export function CreateDTSpellbookUpdate(props) {
  const { onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const characterUUID = useCharacterStore((s) => s.uuid);
  const requestCharacterRefresh = useCharacterStore((s) => s.requestRefresh);

  const [date, setDate] = useState(new Date());
  const [gold, setGold] = useState(0);
  const [downtime, setDowntime] = useState(0);
  const [dmName, setDMName] = useState("");
  const [sourceChar, setSourceChar] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    createEventSpellbookUpdate(
      characterUUID,
      gold,
      downtime,
      dmName,
      sourceChar,
      text,
    )
      .then((response) => {
        displayMessage("Spellbook update added to log", "success");
        requestCharacterRefresh();
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
    <Stack sx={{ gap: "0.4em" }}>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Spellbook Update</Typography>
      </Divider>

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
          onChange={(e) => {
            if (e.target.value >= 0) setGold(e.target.value);
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
          onChange={(e) => {
            if (e.target.value >= 0) setDowntime(e.target.value);
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
            inputFormat="yyyy/MM/dd"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ flexGrow: 2 }} />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: "1em" }}>
        <TextField
          fullWidth
          label="DM Name (optional)"
          placeholder="Presiding DM"
          value={dmName}
          onChange={(e) => setDMName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Source Character (optional)"
          placeholder="Character you copied from"
          value={sourceChar}
          onChange={(e) => setSourceChar(e.target.value)}
        />
      </Box>
      <TextField
        fullWidth
        label="Details"
        placeholder="Add details of spells copied to your spellbook here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        minRows={4}
        maxRows={6}
      />

      <Button
        variant="contained"
        sx={{ width: "60%", margin: "auto" }}
        disabled={!text || gold <= 0 || downtime <= 0}
        onClick={handleSubmit}
      >
        Add Spellbook Update
      </Button>
    </Stack>
  );
}

export default CreateDTSpellbookUpdate;

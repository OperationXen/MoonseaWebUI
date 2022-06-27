import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Typography, Button, FormGroup, Tooltip } from "@mui/material";
import { Checkbox, TextField, Divider, FormControlLabel } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import useSnackbar from "../../../datastore/snackbar";
import useCharacterStore from "../../../datastore/character";
import StatsWidget from "../../characters/widgets/StatsWidget";
import { createPlayerGame } from "../../../api/events";

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.4em",
  margin: "0.4em 0",
};

export default function CreateCharacterGame(props) {
  const { onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const characterUUID = useCharacterStore((s) => s.uuid);
  const requestCharacterRefresh = useCharacterStore((s) => s.requestRefresh);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [dmName, setDMName] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState(true);
  const [gold, setGold] = useState(250);
  const [downtime, setDowntime] = useState(10);

  const [highlight, setHighlight] = useState(false);

  const handleSubmit = () => {
    createPlayerGame(characterUUID, {
      module: code,
      name: name,
      datetime: date,
      dm_name: dmName,
      location: location,
      gold: gold,
      downtime: downtime,
      levels: level ? 1 : 0,
    })
      .then((response) => {
        displayMessage("Game added to log", "success");
        requestCharacterRefresh();
        onClose && onClose();
      })
      .catch(() => displayMessage("Error creating game", "error"));
  };

  return (
    <Box
      sx={{
        sx: {
          borderRadius: "8px",
          border: "1px solid black",
          boxShadow: `0 0 4px inset black`,
          display: "flex",
          width: "42em",
          gap: "0.4em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Game Details</Typography>
      </Divider>

      <Box sx={row}>
        <TextField
          sx={{ maxWidth: "30%" }}
          label="Module code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="DDAL00-02A"
          required
          error={highlight && !code}
        />
        <TextField
          sx={{ flexGrow: 10 }}
          label="Module name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="The Darkwood Webs"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Game date"
            inputFormat="yyyy/MM/dd"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ maxWidth: "30%" }} />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={row}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="DM Name"
          value={dmName}
          onChange={(e) => setDMName(e.target.value)}
          required
          error={highlight && !dmName}
        />
        <TextField
          sx={{ flexGrow: 1 }}
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Triden Games"
        />
      </Box>
      <Divider sx={{ width: "95%", margin: "auto" }}>
        <Typography>Rewards</Typography>
      </Divider>

      <Box sx={{ ...row, justifyContent: "space-around" }}>
        <StatsWidget
          locked={false}
          name="Gold"
          icon={<GiTwoCoins />}
          value={gold}
          setValue={setGold}
          sx={{ width: "25%" }}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={level} onChange={() => setLevel(!level)} />
            }
            label="Level Gained"
          />
        </FormGroup>

        <StatsWidget
          locked={false}
          name="Downtime"
          icon={<DowntimeIcon fontSize="small" />}
          value={downtime}
          setValue={setDowntime}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={row}>
        <Tooltip title="No implemented yet" placement="left">
          <TextField fullWidth label="Item Reward" disabled />
        </Tooltip>
      </Box>
      <Box sx={row}>
        <Tooltip title="No implemented yet" placement="left">
          <TextField fullWidth label="Consumables" disabled />
        </Tooltip>
      </Box>

      <Box
        display="flex"
        onMouseOver={() => setHighlight(true)}
        onMouseOut={() => setHighlight(false)}
      >
        <Button
          variant="contained"
          sx={{ width: "60%", margin: "auto" }}
          disabled={!code || !dmName}
          onClick={handleSubmit}
        >
          Create Game
        </Button>
      </Box>
    </Box>
  );
}

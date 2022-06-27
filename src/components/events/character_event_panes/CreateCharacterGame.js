import { useState } from "react";

import { Box, Typography, Button, FormGroup } from "@mui/material";
import { Checkbox, TextField, Divider, FormControlLabel } from "@mui/material";

import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import StatsWidget from "../../characters/widgets/StatsWidget";

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.4em",
  margin: "0.4em 0",
};

export default function CreateCharacterGame(props) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [dmName, setDMName] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState(true);
  const [gold, setGold] = useState(250);
  const [downtime, setDowntime] = useState(10);

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
          sx={{ flexGrow: 2 }}
          label="Module code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="DDAL00-02A"
        />
        <TextField
          sx={{ flexGrow: 8 }}
          label="Module name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="The Darkwood Webs"
        />
      </Box>
      <Box sx={row}>
        <TextField
          sx={{ flexGrow: 1 }}
          label="DM Name"
          value={dmName}
          onChange={(e) => setDMName(e.target.value)}
        />
        <TextField
          sx={{ flexGrow: 1 }}
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Triden Games"
        />
      </Box>
      <TextField sx={{ flexGrow: 1 }} label="Game date" />
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
        <TextField fullWidth label="Item Reward" />
      </Box>
      <Box sx={row}>
        <TextField fullWidth label="Consumables" />
      </Box>

      <Box width={"100%"} display="flex">
        <Button variant="contained" sx={{ width: "60%", margin: "auto" }}>
          Create Game
        </Button>
      </Box>
    </Box>
  );
}

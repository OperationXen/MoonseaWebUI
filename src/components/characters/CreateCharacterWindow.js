import { useState } from "react";

import { Box, Dialog, Typography } from "@mui/material";
import { TextField, Divider, IconButton, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";

import useCharacterStore from "../../datastore/character";
import useSnackbar from "../../datastore/snackbar";
import { createCharacter } from "../../api/character";
import StatsWidget from "./widgets/StatsWidget";

const row = {
  width: "100%",
  flexGrow: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function CreateCharacterWindow(props) {
  const { open, onClose } = props;
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const requestRefresh = useCharacterStore((s) => s.requestRefresh);

  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [classes, setClasses] = useState("");
  const [level, setLevel] = useState(1);
  const [sheet, setSheet] = useState("");
  const [vision, setVision] = useState("");
  const [ac, setAC] = useState(10);
  const [hp, setHP] = useState(10);
  const [pp, setPP] = useState(10);
  const [dc, setDC] = useState(10);
  const [bio, setBio] = useState("");
  const [dmText, setDMText] = useState("");

  const handleSubmit = () => {
    let data = {
      name: name,
      portrait: null,
      token: null,
      sheet: sheet,
      public: true,
      season: "11",
      race: race,
      level: level,
      classes: classes,
      gold: 0,
      downtime: 0,
      ac: ac,
      hp: hp,
      pp: pp,
      dc: dc,
      vision: vision,
      biography: bio,
      dm_text: dmText,
    };
    createCharacter(data).then((response) => {
      displayMessage(`Character ${name} created`, "success");
      requestRefresh();
      onClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          border: "2px solid black",
          boxShadow: `0 0 8px inset black`,
          display: "flex",
          width: "42em",
          flexDirection: "column",
          alignItems: "center",
          padding: "1em 2em",
        },
      }}
    >
      <Typography variant="h3">Create new character</Typography>
      <Divider sx={{ width: "95%" }}>Details</Divider>
      <Box sx={row}>
        <TextField
          sx={{ flexGrow: 0.65 }}
          label="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          sx={{ flexGrow: 0.3 }}
          placeholder="Kobold"
          label="Race"
          value={race}
          onChange={(e) => setRace(e.target.value)}
        />
      </Box>
      <Box sx={{ ...row, margin: "0.6em 0" }}>
        <TextField
          sx={{ flexGrow: 0.8 }}
          placeholder="Wizard (Evocation)"
          label="Class"
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
        />
        <Box sx={{}}>
          <Box sx={{ ...row, alignItems: "center" }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Total Level
            </Typography>
            <IconButton onClick={() => level > 0 && setLevel(level - 1)}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{level}</Typography>
            <IconButton onClick={() => setLevel(level + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={row}>
        <TextField
          value={sheet}
          label="Link to character sheet"
          placeholder="D&DBeyond.com or Roll20.net link"
          onChange={(e) => setSheet(e.target.value)}
          sx={{ flexGrow: 0.6 }}
        />
        <TextField
          value={vision}
          label="Character vision"
          placeholder="Darkvision (60ft)"
          onChange={(e) => setVision(e.target.value)}
          sx={{ flexGrow: 0.35 }}
        />
      </Box>
      <Divider sx={{ width: "95%" }}>Statistics</Divider>
      <Box sx={row}>
        <StatsWidget
          name="AC"
          icon={<ShieldIcon fontSize="small" />}
          value={ac}
          setValue={setAC}
          sx={{ width: "25%" }}
        />
        <StatsWidget
          name="HP"
          icon={<HealthIcon fontSize="small" />}
          value={hp}
          setValue={setHP}
          sx={{ width: "25%" }}
        />
        <StatsWidget
          name="PP"
          icon={<PerceptionIcon fontSize="small" />}
          value={pp}
          setValue={setPP}
          sx={{ width: "25%" }}
        />
        <StatsWidget
          name="DC"
          icon={<SaveDCIcon fontSize="small" />}
          value={dc}
          setValue={setDC}
          sx={{ width: "25%" }}
        />
      </Box>
      <Divider sx={{ width: "95%" }}>Misc info</Divider>
      <Box sx={{ ...row, margin: "0.2em 0" }}>
        <TextField
          label="Backstory"
          placeholder="Backstory and biography for your character"
          multiline
          maxRows={2}
          minRows={4}
          fullWidth
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>
      <Box sx={{ ...row, margin: "0.4em 0" }}>
        <TextField
          label="DM Info"
          placeholder="Information for your DM, e.g. summoned creatures or other shenanigans"
          multiline
          maxRows={1}
          minRows={4}
          fullWidth
          value={dmText}
          onChange={(e) => setDMText(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        sx={{ width: "60%" }}
        disabled={!name}
        onClick={handleSubmit}
      >
        Create Character
      </Button>
    </Dialog>
  );
}

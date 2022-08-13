import { useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { Box, Dialog, Typography, TextField } from "@mui/material";
import { Button, IconButton, Divider } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useSnackbar from "../../datastore/snackbar";
import { createDMGame, updateDMGame } from "../../api/events";

const row = {
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
};

export default function CreateEditDMGame(props) {
  const { open, onClose, onAdd, data } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const [highlight, setHighlight] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [hours, setHours] = useState(4);
  const [breakdown, setBreakdown] = useState("");

  const [gold, setGold] = useState(0);
  const [downtime, setDowntime] = useState(10);
  const [levelup, setLevelup] = useState(true);
  const [item, setItem] = useState("");

  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState(null);
  const [notes, setNotes] = useState("");

  const editMode = !!data.uuid;

  // Helper function to clear out all game state to a set of defaults
  const clearValues = () => {
    setCode("");
    setName("");
    setItem("");
    setHours(4);
    setBreakdown("");
    setLocation("");
    setNotes("");
    setGold(250);
    setDowntime(10);
    setLevelup(true);
    setDatetime(null);
  };

  // Set initial state value to whatever is passed in as props if component is being used in edit mode
  useEffect(() => {
    if (editMode) {
      setCode(data.module);
      setName(data.name);
      setHours(data.hours);
      setBreakdown(data.hours_notes);
      setLocation(data.location);
      setNotes(data.notes);
      setDatetime(data.datetime);
      setDowntime(data.downtime);
      setGold(data.gold);
      setLevelup(!!data.levels);
    } else clearValues();
  }, [data, editMode]);

  const handleSubmit = () => {
    let gameData = {
      datetime: datetime,
      module: code,
      name: name,
      gold: gold,
      downtime: downtime,
      levels: levelup ? 1 : 0,
      hours: hours,
      hours_notes: breakdown,
      location: location,
      notes: notes,
    };

    if (editMode) {
      updateDMGame(data.uuid, gameData)
        .then((r) => {
          displayMessage("Game updated", "info");
          onAdd();
          onClose();
        })
        .catch((e) =>
          displayMessage(e.response.data.message ?? "Unable to update", "error")
        );
    } else {
      createDMGame(
        datetime,
        code,
        name,
        gold,
        downtime,
        levelup ? 1 : 0,
        hours,
        breakdown,
        location,
        notes
      )
        .then((response) => {
          clearValues();
          displayMessage("Game added successfully", "success");
          onAdd();
          onClose();
        })
        .catch((error) => {
          displayMessage("Unable to create this game", "error");
        });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            padding: "1em 2em",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: "8px",
            border: "2px solid black",
            boxShadow: `0 0 8px inset black`,
            width: "42em",
          },
        }}
      >
        <Typography variant="h3">
          {editMode ? "Edit existing game" : "Add New Game"}
        </Typography>
        <Divider sx={{ width: "95%", margin: "0.4em" }}>Module Info</Divider>
        <Box sx={{ ...row, width: "100%" }}>
          <TextField
            label="Module Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            error={highlight && code === ""}
          />
          <TextField
            label="Module Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={highlight && name === ""}
          />
        </Box>
        <Divider sx={{ width: "95%", margin: "0.4em" }}>Service Hours</Divider>
        <Box sx={{ ...row, width: "100%" }}>
          <Box sx={{ flexGrow: 0.08, ...row }}>
            <IconButton onClick={() => hours > 0 && setHours(hours - 1)}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="h5">{hours}</Typography>
            <IconButton onClick={() => setHours(hours + 1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <TextField
            sx={{ flexGrow: 0.8 }}
            label="Service hours breakdown"
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
          />
        </Box>
        <Divider sx={{ width: "95%", margin: "0.4em" }}>Rewards</Divider>
        <Box sx={{ ...row, width: "100%" }}>
          <TextField
            type="number"
            sx={{ width: "10em" }}
            label="Gold"
            value={gold}
            onChange={(e) => e.target.value >= 0 && setGold(e.target.value)}
          ></TextField>
          <TextField
            type="number"
            sx={{ width: "10em" }}
            label="Downtime"
            value={downtime}
            onChange={(e) => e.target.value >= 0 && setDowntime(e.target.value)}
          ></TextField>
          <FormGroup sx={{ width: "6em" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={levelup}
                  onChange={(e) => setLevelup(e.target.checked)}
                />
              }
              label="Levelup"
            />
          </FormGroup>
        </Box>
        <TextField
          label="Item"
          fullWidth
          sx={{ marginTop: "0.6em" }}
          value={item}
          onChange={(e) => setItem(e.target.value)}
        ></TextField>
        <Divider sx={{ width: "95%", margin: "0.4em" }}>Details</Divider>
        <Box sx={{ ...row, width: "100%" }}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></TextField>

          <DateTimePicker
            label="Date and Time"
            value={datetime}
            inputFormat="yyyy/MM/dd HH:mm"
            onChange={setDatetime}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <TextField
          label="Notes"
          fullWidth
          multiline={true}
          minRows={2}
          maxRows={4}
          sx={{ marginTop: "0.6em" }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></TextField>
        <Box
          width="60%"
          onMouseOver={() => setHighlight(true)}
          onMouseOut={() => setHighlight(false)}
        >
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "0.6em" }}
            onClick={handleSubmit}
            disabled={!code || !name}
          >
            {editMode ? "Update game" : "Add Game"}
          </Button>
        </Box>
      </Dialog>
    </LocalizationProvider>
  );
}

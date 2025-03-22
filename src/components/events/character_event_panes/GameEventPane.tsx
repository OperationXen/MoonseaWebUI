"use client";

import React, { useState } from "react";

import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import AddIcon from "@mui/icons-material/Add";
import { GiTwoCoins } from "react-icons/gi";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, Typography, Button, FormGroup } from "@mui/material";
import { Checkbox, TextField, Divider, FormControlLabel } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import StatsWidget from "@/components/characters/StatsWidget";
import CreateConsumableDialog from "@/components/items/consumables/CreateConsumableDialog";
import ConsumableItem from "@/components/items/consumables/ConsumableItem";
import SimpleItemCreateWidget from "./SimpleItemCreateWidget";
import { useEvents } from "@/data/fetch/events/character";
import { PartyMember } from "./PartyMember";

import type { UUID } from "@/types/uuid";
import type { Rarity, MagicItem, Consumable } from "@/types/items";
import type { GameEvent } from "@/types/events";

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "4px",
  margin: "8px 0",
};

type PropsType = {
  existingGame?: GameEvent;
  onClose: () => void;
  characterUUID: UUID;
};

export function GameEventPane(props: PropsType) {
  const { existingGame, onClose, characterUUID } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createEvent, updateEvent } = useEvents(characterUUID);

  const [highlight, setHighlight] = useState(false);
  const [code, setCode] = useState(existingGame?.module || "");
  const [name, setName] = useState(existingGame?.name || "");
  const [dmName, setDMName] = useState(existingGame?.dm_name || "");
  const [location, setLocation] = useState(existingGame?.location || "");
  const [items, setItems] = useState<Partial<MagicItem>[]>([]);
  const [consumables, setConsumables] = useState<Partial<Consumable>[]>([]);
  const [notes, setNotes] = useState(existingGame?.notes || "");
  const [consumablesOpen, setConsumablesOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(
    existingGame?.datetime ? new Date(existingGame.datetime) : new Date(),
  );
  const [gold, setGold] = useState(existingGame ? existingGame.gold : 250);
  const [downtime, setDowntime] = useState(
    existingGame ? existingGame.downtime : 10,
  );
  const [level, setLevel] = useState<boolean>(
    existingGame ? !!existingGame.levels : true,
  );

  const editable = existingGame ? existingGame.editable : true;

  const handleAddItem = () => {
    setItems([...items, { name: "", rarity: "uncommon" }]);
  };
  const handleItemDelete = (index: number) => {
    items.splice(index, 1);
    setItems([...items]);
  };
  const handleItemNameChange = (index: number, newName: string) => {
    const newItems = [...items];
    newItems[index].name = newName;
    setItems(newItems);
  };
  const handleItemRarityChange = (index: number, newRarity: Rarity) => {
    const newItems = [...items];
    newItems[index].rarity = newRarity;
    setItems(newItems);
  };

  const handleSubmit = () => {
    const gameEvent = {
      character_uuid: characterUUID,
      module: code,
      event_type: "game",
      name: name,
      datetime: date,
      dm_name: dmName,
      location: location,
      gold: gold,
      downtime: downtime,
      levels: level ? 1 : 0,
      items: items,
      consumables: consumables,
      notes: notes,
    };

    if (existingGame) {
      updateEvent({ ...existingGame, ...gameEvent } as GameEvent)
        .then((_response) => {
          displayMessage("Updated game", "info");
          onClose();
        })
        .catch(() => displayMessage("Error updating game", "error"));
    } else
      createEvent(gameEvent as Partial<GameEvent>)
        .then((_response) => {
          displayMessage("Game added to log", "success");
          onClose && onClose();
        })
        .catch(() => displayMessage("Error creating game", "error"));
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          sx: {
            borderRadius: "8px",
            border: "1px solid black",
            boxShadow: `0 0 4px inset black`,
            display: "flex",
            width: "42em",
            gap: "8px",
            flexDirection: "column",
            alignItems: "center",
            padding: "1em 2em",
          },
        }}
      >
        <Box sx={row}>
          <TextField
            sx={{ maxWidth: "30%" }}
            label="Module code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="DDAL00-02A"
            required
            error={highlight && !code}
            disabled={!editable}
            size="small"
          />
          <TextField
            sx={{ flexGrow: 10 }}
            label="Module name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="The Darkwood Webs"
            disabled={!editable}
            size="small"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Game date"
              format="yyyy/MM/dd"
              value={date}
              onChange={setDate}
              disabled={!editable}
              slotProps={{ textField: { size: "small" } }}
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
            disabled={!editable}
            size="small"
          />
          <TextField
            sx={{ flexGrow: 1 }}
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Triden Games"
            disabled={!editable}
            size="small"
          />
        </Box>

        {existingGame?.characters && (
          <Box sx={{ flexFlow: "row wrap", gap: "4px" }}>
            <Divider>Party</Divider>
            {existingGame?.characters?.map((partyMember) => {
              return (
                <PartyMember
                  data={partyMember}
                  onClick={() => {
                    onClose();
                  }}
                />
              );
            })}
          </Box>
        )}

        <Divider sx={{ width: "95%", margin: "auto" }}>
          <Typography>Notes</Typography>
        </Divider>
        <Box sx={row}>
          <TextField
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            label="Game notes"
            placeholder="Enter any important additional information about this game"
            disabled={!editable}
            size="small"
          />
        </Box>
        <Divider sx={{ width: "95%", margin: "auto" }}>
          <Typography>Rewards</Typography>
        </Divider>

        <Box sx={{ ...row, justifyContent: "space-around" }}>
          <StatsWidget
            locked={!editable}
            allowNegative
            name="Gold"
            icon={<GiTwoCoins />}
            value={gold}
            setValue={setGold}
            sx={{ width: "25%" }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={level}
                  onChange={() => setLevel(!level)}
                  disabled={!editable}
                />
              }
              label="Level Gained"
            />
          </FormGroup>

          <StatsWidget
            locked={!editable}
            allowNegative
            name="Downtime"
            icon={<DowntimeIcon fontSize="small" />}
            value={downtime}
            setValue={setDowntime}
            sx={{ width: "25%" }}
          />
        </Box>

        <Divider sx={{ margin: "0.4em" }} />

        <Box
          sx={{
            display: items.length ? "flex" : "none",
            flexFlow: "column",
            gap: "6px",
            marginTop: "8px",
            border: "1px dashed lightgrey",
            borderRadius: "8px",
            padding: "8px 4px 4px 4px",
          }}
        >
          {items.map((item, index) => {
            return (
              <SimpleItemCreateWidget
                id={index}
                key={index}
                name={item.name}
                rarity={item.rarity}
                setName={handleItemNameChange}
                setRarity={handleItemRarityChange}
                handleDelete={() => handleItemDelete(index)}
              />
            );
          })}
        </Box>

        {!existingGame && (
          <Button
            sx={{ marginY: "4px" }}
            startIcon={<AddIcon />}
            disabled={!!existingGame || !editable}
            variant="outlined"
            size="small"
            fullWidth
            onClick={handleAddItem}
          >
            {items.length >= 1 ? "Add Another item" : "Add an item"}
          </Button>
        )}

        <Box
          sx={{
            display: consumables.length ? "flex" : "none",
            flexFlow: "column",
            gap: "6px",
            border: "1px dashed lightgrey",
            borderRadius: "8px",
            padding: "8px 4px 4px 4px",
          }}
        >
          {consumables.map((consumable, index) => (
            <ConsumableItem
              item={consumable as Consumable}
              editable={editable}
              onChange={() => {}}
              onDelete={() => {}}
              key={index}
            />
          ))}
        </Box>

        {!existingGame && (
          <Button
            sx={{ marginY: "4px" }}
            startIcon={<AddIcon />}
            disabled={!editable}
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => setConsumablesOpen(true)}
          >
            Add consumable item
          </Button>
        )}

        {editable && (
          <Box
            display="flex"
            sx={{ padding: "4px" }}
            onMouseOver={() => setHighlight(true)}
            onMouseOut={() => setHighlight(false)}
          >
            <Button
              variant="contained"
              sx={{ width: "60%", margin: "auto" }}
              disabled={!code || !dmName || !editable}
              onClick={handleSubmit}
            >
              {!!existingGame ? "Update" : "Create Game"}
            </Button>
          </Box>
        )}
      </Box>
      <CreateConsumableDialog
        open={consumablesOpen}
        onClose={() => setConsumablesOpen(false)}
        addItem={(newItem) => {
          setConsumables([...consumables, newItem]);
          setConsumablesOpen(false);
        }}
      />
    </React.Fragment>
  );
}

export default GameEventPane;

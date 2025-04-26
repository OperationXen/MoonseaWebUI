"use client";

import { useState, useEffect } from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HelpIcon from "@mui/icons-material/Help";

import { Dialog, Typography, Divider, Box, FormControl } from "@mui/material";
import { Select, SelectChangeEvent, MenuItem, InputLabel } from "@mui/material";
import { AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import { TextField, Button, Checkbox } from "@mui/material";
import { InputAdornment, Tooltip } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useMagicItems } from "@/data/fetch/items/magicitems";
import { useMagicItemHistory } from "@/data/fetch/items/magicitems";
import { getRarityColour } from "@/utils/items";
import MagicItemOriginSelector from "./MagicItemOriginSelector";

import type { UUID } from "@/types/uuid";
import type { MagicItem, Rarity, ItemSource } from "@/types/items";

type PropsType = {
  open: boolean;
  onClose: () => void;
  characterUUID: UUID;
  item: MagicItem | null;
  defaultRarity?: Rarity;
};

export function MagicItemDialog(props: PropsType) {
  const { open, onClose, characterUUID, item, defaultRarity } = props;

  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { createItem, updateItem } = useMagicItems(characterUUID);
  const { data: itemHistory } = useMagicItemHistory(item?.uuid || null);

  const [name, setName] = useState<string>("");
  const [rpName, setRPName] = useState<string>("");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [minorProperties, setMinorProperties] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [flavour, setFlavour] = useState("");
  const [attunement, setAttunement] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [origin, setOrigin] = useState<ItemSource>();

  const isNewItem = !item;
  const nameChanged = item?.name && item.name !== name;

  useEffect(() => {
    setName(item?.name || "");
    setRarity(item?.rarity || defaultRarity || "uncommon");
    setRPName(item?.rp_name || "");
    setMinorProperties(item?.minor_properties || "");
    setURL(item?.url || "");
    setDesc(item?.description || "");
    setFlavour(item?.flavour || "");
    setAttunement(item?.attunement || false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const handleClose = () => {
    setName("");
    setRPName("");
    setMinorProperties("");
    setURL("");
    setDesc("");
    setFlavour("");
    setAttunement(false);
    onClose();
  };

  const handleSubmit = () => {
    let data: Partial<MagicItem & ItemSource> = {
      uuid: item?.uuid || undefined,
      name,
      rarity,
      flavour,
      attunement,
      url,
      description: desc,
      rp_name: rpName,
      minor_properties: minorProperties,
    };

    if (isNewItem && origin) {
      data.item_source_type = origin.item_source_type;
      data.item_source = origin.item_source;
    }

    if (item) {
      updateItem(data)
        .then(() => {
          displayMessage("Updated", "info");
          handleClose();
        })
        .catch((error) => {
          displayMessage("Error updating consumable item", "error");
          console.error(error);
        });
    } else {
      createItem(data)
        .then((response) => {
          displayMessage(`Added ${response.data.name}`, "success");
          handleClose();
        })
        .catch((error) => {
          displayMessage("Error adding consumable to character", "error");
          console.error(error);
        });
    }
  };

  const itemOriginText = () => {
    const itemOrigin = itemHistory?.[0];

    if (itemOrigin?.event_type === "dm_reward") {
      return (
        <Typography variant="caption">{`Item was a DM reward`}</Typography>
      );
    }
    if (itemOrigin?.event_type === "game") {
      return (
        <Typography variant="caption">{`Item found in module: ${itemOrigin.name || "Unknown module"} (${itemOrigin.module || "?"})`}</Typography>
      );
    }
    return <Typography variant="caption">Item origin unknown</Typography>;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: "40em",
            border: `2px solid ${getRarityColour(rarity)}`,
            borderRadius: "16px",
            boxShadow: `2px 2px 60px black, 1px 1px 8px inset ${getRarityColour(rarity)}`,
            padding: "1.2em",
            display: "flex",
            gap: "0.6em",
            flexDirection: "column",
          },
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        {item ? "Edit existing magic item" : "Create New Item"}
      </Typography>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      ></Box>
      <Box sx={{ width: "100%", display: "flex", gap: "4px" }}>
        <TextField
          sx={{ flexGrow: 2, flexBasis: 4 }}
          label="Item Name"
          value={name}
          placeholder="Item name"
          onChange={(e) => setName(e.target.value)}
          error={highlight && !name}
          required
        />
        <FormControl sx={{ flexGrow: 1, flexBasis: 2 }}>
          <InputLabel id="type-label">Rarity</InputLabel>
          <Select
            label="Rarity"
            value={rarity}
            onChange={(e: SelectChangeEvent) =>
              setRarity(e.target.value as Rarity)
            }
          >
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="veryrare">Very Rare</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </Select>
        </FormControl>
        <Box
          sx={{
            flexBasis: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            border: "1px solid darkgrey",
            borderRadius: "4px",
            padding: "4px",
            cursor: "pointer",
          }}
          onClick={() => setAttunement(!attunement)}
        >
          <Checkbox checked={attunement} sx={{ padding: 0 }} />
          <Typography variant="caption">Attunement</Typography>
        </Box>
      </Box>

      <TextField
        label="Description"
        multiline
        minRows={2}
        maxRows={5}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Item abilities and rule prompts"
      />

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
          <Typography>Advanced options</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <TextField
            fullWidth
            label="Item name override"
            value={rpName}
            onChange={(e) => setRPName(e.target.value)}
            placeholder="Lots of people name their swords"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      placement="top"
                      title="Overrides the item name, allowing you to record both the base item type and the item name. For example the axe 'Hew' is a +1 battle axe with some additional rules"
                    >
                      <HelpIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Flavour"
            multiline
            minRows={3}
            maxRows={8}
            value={flavour}
            onChange={(e) => setFlavour(e.target.value)}
            placeholder="This item easily catches the light and seems to glimmer with an iridescent sheen. It is slightly cool to the touch"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      placement="top"
                      title="Lots of AL rewards have additional non-mechanical details described on them, which can be recorded here leaving the description field free for rules and mechanical effects"
                    >
                      <HelpIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Minor properties"
            value={minorProperties}
            onChange={(e) => setMinorProperties(e.target.value)}
            placeholder="Guardian, Silvered, Sentient, Moontouched, etc"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      placement="top"
                      title="A list of minor properties that the item has, for example a silvered sword would have the 'silvered' property"
                    >
                      <HelpIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Link to further item details (eg a DNDBeyond link)"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="https://www.dndbeyond.com/magic-items/9228421-deck-of-many-things"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      placement="top"
                      title="A link to a page which contains more details about the item, for example DND Beyond or the SRD"
                    >
                      <HelpIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              },
            }}
          />
          {(isNewItem && (
            <MagicItemOriginSelector
              characterUUID={characterUUID}
              origin={origin}
              setOrigin={setOrigin}
            />
          )) || (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {itemOriginText()}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onMouseOver={() => setHighlight(true)}
        onMouseOut={() => setHighlight(false)}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={nameChanged ? "error" : "primary"}
          sx={{
            width: "60%",
          }}
          disabled={!name}
        >
          {item ? "Update item" : "Create Item"}
        </Button>
        {nameChanged && (
          <Typography variant="body2" color="error" mt="8px">
            Change to item name will be recorded on the item's history
          </Typography>
        )}
      </Box>
    </Dialog>
  );
}

export default MagicItemDialog;

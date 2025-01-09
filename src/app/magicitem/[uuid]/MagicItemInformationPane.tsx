import React, { useEffect, useState } from "react";

import {
  Paper,
  Table,
  Typography,
  InputBase,
  SelectChangeEvent,
} from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Checkbox, Select, MenuItem, FormControl } from "@mui/material";

import { getRarityText } from "@/utils/items";

import { Rarity, type MagicItem } from "@/types/items";

type PropsType = {
  item: MagicItem;
  editMode: boolean;
  setEditMode: (x: boolean) => void;
};

const rowStyle = { height: "52px" };
const cellStyle = { padding: "0 1em" };

export default function MagicItemInformationPane(props: PropsType) {
  const { item, editMode } = props;

  const [name, setName] = useState("Loading...");
  const [rarity, setRarity] = useState<Rarity>("uncommon");
  const [attunement, setAttunement] = useState(false);
  const [description, setDescription] = useState("Loading...");
  const [flavour, setFlavour] = useState("Loading...");

  // set state from props
  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setRarity(item.rarity);
    setAttunement(item.attunement);
    setDescription(item.description ?? "");
    setFlavour(item.flavour ?? "");
  }, [item]);


  // display nothing if item is invalid
  if (!item.uuid || !item.name) return null;

  return (
    <Paper sx={{ width: "100%", borderRadius: "8px 8px 0px 0px" }}>
      <Table>
        <TableBody>
          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Name</Typography>
            </TableCell>

            <TableCell sx={cellStyle}>
              <InputBase
                disabled={!editMode}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Rarity</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
              {(editMode && (
                <FormControl size="small" sx={{ minWidth: "12em" }}>
                  <Select
                    value={rarity}
                    onChange={(e: SelectChangeEvent) =>
                      setRarity(e.target.value as Rarity)
                    }
                  >
                    <MenuItem value="uncommon">Uncommon</MenuItem>
                    <MenuItem value="rare">Rare</MenuItem>
                    <MenuItem value="veryrare">Very Rare</MenuItem>
                    <MenuItem value="legendary">Legendary</MenuItem>
                  </Select>
                </FormControl>
              )) || <Typography>{getRarityText(rarity)}</Typography>}
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Attunement</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
              {(editMode && (
                <Checkbox
                  checked={attunement}
                  onChange={(e) => setAttunement(e.target.checked)}
                  sx={{ padding: "0px" }}
                />
              )) || <Typography>{attunement ? "Yes" : "No"}</Typography>}
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Description</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
              <InputBase
                disabled={!editMode}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ width: "100%" }}
                multiline
              />
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Flavour</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
              <InputBase
                disabled={!editMode}
                value={flavour}
                onChange={(e) => setFlavour(e.target.value)}
                sx={{ width: "100%" }}
                multiline
              />
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell sx={cellStyle}>
              <Typography>Owner</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
              <Typography>{item.owner_name ?? "Unknown owner"}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

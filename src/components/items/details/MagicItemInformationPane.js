import React, { useEffect, useState, useCallback } from "react";

import { Paper, Table, Typography, InputBase } from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Checkbox, Select, MenuItem, FormControl } from "@mui/material";

import { getRarityText } from "../../../utils/itemutils";
import { updateMagicItem } from "../../../api/items";
import useMagicItemStore from "../../../datastore/magicitem";
import useSnackbar from "../../../datastore/snackbar";

const rowStyle = { height: "52px" };
const cellStyle = { padding: "0 1em" };

export default function MagicItemInformationPane(props) {
  const { item, editMode } = props;
  const requestItemHistoryRefresh = useMagicItemStore((s) => s.requestRefresh);
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [name, setName] = useState("Loading...");
  const [rarity, setRarity] = useState("");
  const [attunement, setAttunement] = useState(false);
  const [description, setDescription] = useState("Loading...");
  const [flavour, setFlavour] = useState("Loading...");

  const itemChanged = useCallback(() => {
    if (!name) return false;

    if (name !== item.name) return true;
    else if (rarity !== item.rarity) return true;
    else if (attunement !== item.attunement) return true;
    else if (description !== item.description) return true;
    else if (flavour !== item.flavour) return true;
    return false;
  }, [item, name, rarity, attunement, description, flavour]);

  const getUpdateObject = useCallback(() => {
    let obj = {};
    if (name !== item.name) obj["name"] = name;
    if (rarity !== item.rarity) obj["rarity"] = rarity;
    if (attunement !== item.attunement) obj["attunement"] = attunement;
    if (description !== item.description) obj["description"] = description;
    if (flavour !== item.flavour) obj["flavour"] = flavour;

    return obj;
  }, [item, name, rarity, attunement, description, flavour]);

  // set state from props
  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setRarity(item.rarity);
    setAttunement(item.attunement);
    setDescription(item.description);
    setFlavour(item.flavour);
  }, [item]);

  // save changes when edit disabled
  useEffect(() => {
    if (editMode || !item.uuid || !itemChanged()) return;

    updateMagicItem(item.uuid, getUpdateObject())
      .then((response) => {
        requestItemHistoryRefresh();
        snackbar("Item updated", "success");
      })
      .catch((error) => {
        snackbar(error.response.message ?? "Error updating item", "error");
      });
  }, [
    editMode,
    item.uuid,
    snackbar,
    itemChanged,
    getUpdateObject,
    requestItemHistoryRefresh,
  ]);

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
                    onChange={(e) => setRarity(e.target.value)}
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
              <Typography>{item.owner}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

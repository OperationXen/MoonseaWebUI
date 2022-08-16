import React from "react";

import { Paper, Table, TableContainer, Typography } from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";

const rowStyle = { "&:last-child td, &:last-child th": { border: 0 } };

export default function MagicItemInformationPane(props) {
  const { item } = props;

  if (!item.uuid || !item.name) return null;

  return (
    <Paper sx={{ width: "30em" }}>
      <Table>
        <TableBody>
          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Name</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.name}</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Rarity</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.rarity}</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Attunement</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.attunement ? "Yes" : "No"}</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Description</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.description}</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Flavour</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.flavour}</Typography>
            </TableCell>
          </TableRow>

          <TableRow sx={rowStyle}>
            <TableCell component="th" scope="row">
              <Typography>Owner</Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography>{item.owner}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

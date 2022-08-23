import React from "react";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function CharacterLinkWidget(props) {
  const { name, uuid } = props;

  return (
    <Link to={`/character/${uuid}`}>
      <Typography>{name}</Typography>
    </Link>
  );
}

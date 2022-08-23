import React from "react";

import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function ItemLinkWidget(props) {
  const { name, uuid } = props;

  return (
    <Link to={`/magicitem/${uuid}`}>
      <Typography>{name}</Typography>
    </Link>
  );
}

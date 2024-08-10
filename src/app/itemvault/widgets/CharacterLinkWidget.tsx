import React from "react";
import Link from "next/link";

import { Typography } from "@mui/material";

type PropsType = {
  uuid: string;
  name: string;
};

export default function CharacterLinkWidget(props: PropsType) {
  const { name, uuid } = props;

  return (
    <Link href={`/character/${uuid}`}>
      <Typography>{name}</Typography>
    </Link>
  );
}

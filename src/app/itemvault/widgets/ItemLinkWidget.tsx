import React from "react";
import Link from "next/link";

import { Typography } from "@mui/material";

type PropsType = {
  uuid: string;
  name: string;
};

export default function ItemLinkWidget(props: PropsType) {
  const { name, uuid } = props;

  return (
    <Link href={`/magicitem/${uuid}`}>
      <Typography>{name}</Typography>
    </Link>
  );
}

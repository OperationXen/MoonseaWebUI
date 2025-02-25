import React, { useState } from "react";
import Link from "next/link";

import { Box, Paper, Typography, Divider } from "@mui/material";

import { Rarity, type MagicItem } from "@/types/items";
import RarityWidget from "@/components/items/widgets/RarityWidget";

type PropsType = {
  item: MagicItem;
  editMode: boolean;
  setEditMode: (x: boolean) => void;
};

export default function MagicItemInformationPane(props: PropsType) {
  const { item, editMode } = props;

  const [name, setName] = useState(item?.name || "");
  const [rpName, setRPName] = useState(item?.rp_name || "");
  const [rarity, setRarity] = useState<Rarity>(item?.rarity || "uncommon");
  const [minorProps, setMinorProps] = useState(item?.minor_properties || "");
  const [attunement, setAttunement] = useState(item?.attunement || false);
  const [description, setDescription] = useState(item?.description || "");
  const [flavour, setFlavour] = useState(item?.flavour || "");
  const [url, setURL] = useState(item?.url || "");

  // display nothing if item is invalid
  if (!item.uuid || !item.name) return null;

  const getNameText = () => {
    if (rpName) return `${rpName} - (${name})`;
    return name;
  };

  const getStatusText = () => {
    if (item.equipped) return "Item is currently equipped";
    else if (item.market) return "Item is available for trade";
    else return "Item is unused";
  };

  return (
    <Paper className="w-full flex flex-col rounded-md px-2">
      <Box className="flex gap-2">
        <Typography fontWeight={600}>Name:</Typography>
        <Typography>{getNameText()}</Typography>
      </Box>
      <Box className="flex gap-2">
        <Typography fontWeight={600}>Rarity:</Typography>
        <RarityWidget rarity={rarity} text />
      </Box>
      {minorProps !== "" && (
        <Box className="flex gap-2">
          <Typography fontWeight={600}>Additional Properties:</Typography>
          <Typography>{minorProps}</Typography>
        </Box>
      )}
      <Box className="flex gap-2">
        <Typography fontWeight={600}>Status:</Typography>
        <Typography>{getStatusText()}</Typography>
      </Box>
      <Box className="flex gap-2">
        <Typography fontWeight={600}>Owner:</Typography>
        <Link href={`/character/${item.owner_uuid}`}>{item.owner_name}</Link>
      </Box>
      <Box className="flex gap-2">
        <Typography fontWeight={600}>Reference URL:</Typography>
        <Link href={url}>{url}</Link>
      </Box>

      <Divider className="py-1" />

      <Box className="flex flex-col gap-2">
        <Typography fontWeight={600}>Item Description:</Typography>
        <Typography fontStyle={"italic"} variant="body2">
          {description}
        </Typography>

        <Typography fontWeight={600}>Flavour text:</Typography>
        <Typography variant="body2" fontStyle={"italic"}>
          {flavour}
        </Typography>
      </Box>
    </Paper>
  );
}

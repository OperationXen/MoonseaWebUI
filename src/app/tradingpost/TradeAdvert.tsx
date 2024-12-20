"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, Box } from "@mui/material";
import { Typography, IconButton, Tooltip, Badge } from "@mui/material";

import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import RarityWidget from "@/components/items/widgets/RarityWidget";
import DeleteConfirm from "@/components/items/widgets/DeleteConfirm";
import TradeOfferDialog from "./TradeOfferDialog";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";

type PropsType = {
  description: string;
  offers: any;
  uuid: UUID;
  item: MagicItem;
  market?: boolean;
};

export default function TradeAdvert(props: PropsType) {
  const { description, offers, uuid, item, market = false } = props;

  const router = useRouter();

  const numOffers = offers?.length ?? 0;
  const [highlight, setHighlight] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  const getActionIcon = () => {
    if (market) {
      return (
        <Tooltip title="Make an offer for this item">
          <IconButton onClick={() => setShowOffer(true)}>
            <AddShoppingCartIcon sx={{ color: "black" }} />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={numOffers ? "View offers" : "No pending offers"}>
          <IconButton sx={{ opacity: numOffers ? 1 : 0.2 }}>
            <Badge invisible={!numOffers} badgeContent={numOffers} color="info">
              <LabelIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      );
    }
  };

  return (
    <Card
      sx={{ width: "100%" }}
      onMouseOver={() => setHighlight(true)}
      onMouseOut={() => setHighlight(false)}
    >
      <CardHeader
        avatar={<RarityWidget rarity={item.rarity} />}
        action={getActionIcon()}
        title={
          <Typography
            variant="subtitle1"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/magicitem/${item.uuid}`)}
          >
            {item.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle2"
            sx={{ opacity: 0.8, cursor: "pointer" }}
            onClick={() => {
              router.push(`/character/${item.owner_uuid}`);
            }}
          >
            {item.owner_name}
          </Typography>
        }
      />
      <CardContent sx={{ height: "3em" }}>
        <Typography
          variant="caption"
          sx={{ opacity: highlight ? "0.9" : "0.7" }}
        >
          {description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        {!market && (
          <Tooltip title="Delete this advert and return item to its owner's inventory">
            <IconButton
              sx={{ margin: "0.4em" }}
              onClick={() => setShowDelete(true)}
            >
              <DeleteIcon
                sx={{
                  opacity: highlight ? "0.9" : "0.3",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <DeleteConfirm
        open={showDelete}
        onClose={() => setShowDelete(false)}
        name={item.name}
        uuid={uuid}
      />
      <TradeOfferDialog
        open={showOffer}
        onClose={() => setShowOffer(false)}
        name={item.name}
        uuid={uuid}
        rarity={item.rarity}
      />
    </Card>
  );
}

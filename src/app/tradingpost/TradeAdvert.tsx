"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardActionArea } from "@mui/material";
import { Typography, IconButton, Tooltip, Badge } from "@mui/material";

import LabelIcon from "@mui/icons-material/Label";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useTradingPostAdvert } from "@/data/fetch/tradingpost/items";
import RarityWidget from "@/components/items/widgets/RarityWidget";
import TradeOfferDialog from "./TradeOfferDialog";
import useSnackbar from "@/data/store/snackbar";

import type { UUID } from "@/types/uuid";
import type { MagicItem } from "@/types/items";
import { TradeOffer } from "@/types/trade";

type PropsType = {
  description: string;
  uuid: UUID;
  item: MagicItem;
  market?: boolean;
  offers?: TradeOffer[];
  onRemove: () => void;
};

export default function TradeAdvert(props: PropsType) {
  const { description, offers, uuid, item, market = false } = props;
  const { onRemove } = props;

  const router = useRouter();
  const { deleteAdvert } = useTradingPostAdvert(uuid);
  const { displayMessage } = useSnackbar();

  const numOffers = offers?.length ?? 0;
  const [highlight, setHighlight] = useState(false);
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
          <IconButton
            sx={{ opacity: numOffers ? 1 : 0.2 }}
            onClick={() => router.push("/tradingpost/offers")}
          >
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
      className="flex-grow-0 rounded-md min-w-72"
      onMouseOver={() => setHighlight(true)}
      onMouseOut={() => setHighlight(false)}
      elevation={6}
    >
      <CardHeader
        className="py-1 px-2"
        avatar={<RarityWidget rarity={item.rarity} size="medium" />}
        title={
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(`/magicitem/${item.uuid}`)}
          >
            {item.name}
          </Typography>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ opacity: 0.8, cursor: "pointer" }}
            onClick={() => {
              router.push(`/character/${item.owner_uuid}`);
            }}
          >
            {item.owner_name}
          </Typography>
        }
      />
      <CardContent
        className="h-24 flex items-center justify-center mx-1"
        sx={{ border: "1px dotted lightgrey" }}
      >
        <Typography
          variant="caption"
          sx={{ opacity: highlight ? "0.9" : "0.7" }}
        >
          {description?.substring(0, 80) +
            (description.length > 80 ? "..." : "") || "No advert text"}
        </Typography>
      </CardContent>
      <CardActionArea className="w-full flex justify-end pr-2 pt-2">
        {item.editable && (
          <Tooltip title="Remove this item from the trading post and return it to the owner">
            <IconButton
              onClick={() => {
                deleteAdvert().then(() => {
                  onRemove();
                  displayMessage(
                    `${item.name} returned to ${item.owner_name}`,
                    "info",
                  );
                });
              }}
            >
              <RemoveShoppingCartIcon
                sx={{
                  opacity: highlight ? "0.9" : "0.3",
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
        {getActionIcon()}
      </CardActionArea>

      <TradeOfferDialog
        open={showOffer}
        onClose={() => setShowOffer(false)}
        advertUUID={uuid}
        item={item}
      />
    </Card>
  );
}

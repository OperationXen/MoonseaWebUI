import React, { useState } from "react";

import { Card, CardContent, CardHeader, Box } from "@mui/material";
import { Typography, IconButton, Tooltip, Badge } from "@mui/material";

import LabelIcon from "@mui/icons-material/Label";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import RarityWidget from "../items/widgets/RarityWidget";
import DeleteConfirm from "./widgets/DeleteConfirm";
import TradeOfferDialog from "./TradeOfferDialog";

export default function TradeAdvert(props) {
  const { description, owner, offers, uuid } = props;
  const { market } = props ?? false;
  const { name, rarity } = props.item;

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
        avatar={<RarityWidget rarity={rarity} />}
        action={getActionIcon()}
        title={name}
        subheader={owner}
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
        owner={owner}
        name={name}
        uuid={uuid}
      />
      <TradeOfferDialog
        open={showOffer}
        onClose={() => setShowOffer(false)}
        name={name}
        uuid={uuid}
        rarity={rarity}
      />
    </Card>
  );
}

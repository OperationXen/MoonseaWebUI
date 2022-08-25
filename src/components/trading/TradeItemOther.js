import React, { useState } from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import { Typography, IconButton, Tooltip, Badge } from "@mui/material";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import TradeOfferDialog from "./TradeOfferDialog";
import RarityWidget from "../itemvault/widgets/RarityWidget";

export default function TradeItem(props) {
  const { uuid, name, rarity, owner, owner_uuid, details, numOffers } = props;

  const [highlight, setHighlight] = useState(false);
  const [createOfferOpen, setCreateOfferOpen] = useState(false);

  return (
    <Card
      sx={{ width: "100%" }}
      onMouseOver={() => setHighlight(true)}
      onMouseOut={() => setHighlight(false)}
    >
      <CardHeader
        avatar={<RarityWidget rarity={rarity} />}
        action={
          <Tooltip
            title={
              numOffers
                ? `You have ${numOffers} outstanding offers on this item`
                : "Make offer"
            }
          >
            <IconButton onClick={() => setCreateOfferOpen(true)}>
              <Badge
                invisible={!!numOffers}
                badgeContent={numOffers}
                color="secondary"
              >
                <ShoppingCartCheckoutIcon
                  sx={{ color: highlight ? "black" : "grey" }}
                />
              </Badge>
            </IconButton>
          </Tooltip>
        }
        title={name}
        subheader={owner}
      />
      <CardContent
        sx={{ display: "flex", alignItems: "center", minHeight: "5em" }}
      >
        <Typography
          variant="caption"
          sx={{ opacity: highlight ? "0.9" : "0.7" }}
        >
          {details}
        </Typography>
      </CardContent>
      <TradeOfferDialog
        open={createOfferOpen}
        setOpen={setCreateOfferOpen}
        {...props}
      />
    </Card>
  );
}

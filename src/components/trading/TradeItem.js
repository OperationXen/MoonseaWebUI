import React from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import { Typography, IconButton, Tooltip, Badge } from "@mui/material";

import LabelIcon from "@mui/icons-material/Label";

import RarityWidget from "../itemvault/widgets/RarityWidget";

export default function TradeItem(props) {
  const { uuid, name, rarity, owner, owner_uuid, details, offers } = props;
  const numOffers = offers?.length ?? 0;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={<RarityWidget rarity={rarity} />}
        action={
          <Tooltip title={numOffers ? "View offers" : "No pending offers"}>
            <IconButton sx={{ opacity: numOffers ? 1 : 0.2 }}>
              <Badge
                invisible={!numOffers}
                badgeContent={numOffers}
                color="info"
              >
                <LabelIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        }
        title={name}
        subheader={owner}
      />
      <CardContent>
        <Typography variant="caption">{details}</Typography>
      </CardContent>
    </Card>
  );
}

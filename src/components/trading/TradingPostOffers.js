import React, { useEffect, useState, useCallback } from "react";

import { Typography, Tooltip } from "@mui/material";
import { DataGrid, GridOverlay, GridActionsCellItem } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { getTradeOffers } from "../../api/trade";
import { getDateString } from "../../utils/format";
import RarityWidget from "../items/widgets/RarityWidget";

const getRowRarityWidget = (r) => {
  return <RarityWidget rarity={r.row.item.rarity} />;
};
const formatDateString = (data) => {
  let val = getDateString(new Date(data.value));
  return val;
};
const getOfferType = (p) => {
  let offerType = p.row.direction;

  if (offerType === "in") return "Offer";
  else if (offerType === "out") return "My Proposal";
  return "";
};

const getAdvertItem = (r) => {
  let itemName = r.row.advert.item.name;
  let itemOwner = r.row.advert.owner;

  return `${itemName} (${itemOwner})`;
};
const getTheirItem = (r) => {
  let itemName = r.row.item.name;
  let itemOwner = r.row.owner;

  return `${itemName} (${itemOwner})`;
};
const getRowActions = (params) => {
  return [
    <Tooltip title="Accept offer" placement="left">
      <GridActionsCellItem
        icon={<CheckCircleIcon sx={{ color: "darkgreen" }} />}
      />
    </Tooltip>,
    <Tooltip title="Reject offer" placement="right">
      <GridActionsCellItem icon={<CancelIcon sx={{ color: "darkred" }} />} />
    </Tooltip>,
  ];
};

const columns = [
  {
    headerName: "Date",
    field: "datetime",
    valueFormatter: formatDateString,
    align: "center",
    flex: 0.1,
  },
  {
    field: "rarity",
    headerName: "Rarity",
    align: "center",
    renderCell: getRowRarityWidget,
    flex: 0.1,
  },
  {
    field: "direction",
    headerName: "Offer Type",
    align: "center",
    valueGetter: getOfferType,
    flex: 0.1,
  },
  {
    headerName: "My item",
    field: "item",
    valueGetter: getAdvertItem,
    flex: 0.3,
  },
  {
    headerName: "Their item",
    field: "item.name",
    valueGetter: getTheirItem,
    flex: 0.3,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    getActions: getRowActions,
  },
];
{
  /*
{
  "uuid": "012cb08c-b23e-4979-93f4-eca780031d69",
  "datetime": "2022-09-07T19:52:39.772642Z",
  "item": {
    "uuid": "8fc55792-cf16-4874-8801-94f736ffba3b",
    "rarity": "legendary",
    "name": "Boots of sparkles",
    "equipped": false
  },
  "advert": {
    "uuid": "60124643-0b0f-4e00-8e35-75bc94681c1d",
    "datetime": "2022-09-07T16:06:52.785281Z",
    "owner": "Meepo",
    "description": "I would love to see a hat of frogs",
    "item": {
      "uuid": "c4db591b-4a8f-4ff0-8d4d-da0e587448fc",
      "rarity": "legendary",
      "name": "Wand of chickens",
      "equipped": false
    }
  },
  "direction": "in",
  "owner": "Mekaniq",
  "description": ""
}
*/
}
export default function TradingPostOffers(props) {
  const [pendingOffers, setPendingOffers] = useState([]);

  useEffect(() => {
    getTradeOffers().then((response) => {
      setPendingOffers(response.data);
    });
  }, []);

  return (
    <Grid container sx={{ margin: "0.4em", height: "100%" }} spacing={2}>
      <DataGrid
        rows={pendingOffers}
        getRowId={(r) => r.uuid}
        columns={columns}
        sx={{ height: "calc(100% - 3em)" }}
        components={{
          NoRowsOverlay: () => (
            <GridOverlay>
              <Typography sx={{ opacity: "0.6" }}>No pending offers</Typography>
            </GridOverlay>
          ),
        }}
      />
    </Grid>
  );
}

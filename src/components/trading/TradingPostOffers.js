import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Tooltip } from "@mui/material";
import { DataGrid, GridOverlay, GridActionsCellItem } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { getTradeOffers } from "../../api/trade";
import { getDateString } from "../../utils/format";
import useTradeStore from "../../datastore/trade";
import OfferRejectConfirm from "./widgets/OfferRejectConfirm";
import RarityWidget from "../items/widgets/RarityWidget";

export default function TradingPostOffers(props) {
  const navigate = useNavigate();
  const refresh = useTradeStore((s) => s.refresh);

  const [pendingOffers, setPendingOffers] = useState([]);
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    getTradeOffers().then((response) => {
      setPendingOffers(response.data);
    });
  }, [refresh]);

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

  const getItem = (x) => {
    return (
      <Typography
        variant="body2"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(`/magicitem/${x.uuid}`)}
      >
        {`${x.name} (${x.owner_name})`}
      </Typography>
    );
  };

  const getMyItem = (p) => {
    if (p.row.direction === "in") return getItem(p.row.advert.item);
    else if (p.row.direction === "out") return getItem(p.row.item);
    return null;
  };
  const getTheirItem = (p) => {
    if (p.row.direction === "in") return getItem(p.row.item);
    else if (p.row.direction === "out") return getItem(p.row.advert.item);
    return null;
  };

  const acceptOffer = (p) => {};
  const rejectOffer = (p) => {
    setOffer(p.row);
    setShowReject(true);
  };

  const getRowActions = (p) => {
    if (p.row.direction === "in") {
      return [
        <Tooltip title="Accept offer" placement="left">
          <GridActionsCellItem
            onClick={() => setShowAccept(true)}
            icon={<CheckCircleIcon sx={{ color: "darkgreen" }} />}
          />
        </Tooltip>,
        <Tooltip title="Reject offer" placement="right">
          <GridActionsCellItem
            onClick={() => rejectOffer(p)}
            icon={<CancelIcon sx={{ color: "darkred" }} />}
          />
        </Tooltip>,
      ];
    } else if (p.row.direction === "out") {
      return [
        <Tooltip title="Rescind offer" placement="right">
          <GridActionsCellItem
            icon={<CancelIcon sx={{ color: "darkred" }} />}
          />
        </Tooltip>,
      ];
    }
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
      renderCell: getMyItem,
      flex: 0.3,
    },
    {
      headerName: "Their item",
      field: "item.name",
      renderCell: getTheirItem,
      flex: 0.3,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <Grid container sx={{ margin: "0.4em", height: "100%" }} spacing={2}>
        <DataGrid
          rows={pendingOffers}
          getRowId={(r) => r.uuid}
          columns={columns}
          sx={{ height: "calc(100% - 3em)" }}
          components={{
            NoRowsOverlay: () => (
              <GridOverlay>
                <Typography sx={{ opacity: "0.6" }}>
                  No pending offers
                </Typography>
              </GridOverlay>
            ),
          }}
        />
      </Grid>
      <OfferRejectConfirm
        open={showReject}
        onClose={() => setShowReject(false)}
        {...offer}
      />
    </React.Fragment>
  );
}

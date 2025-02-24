"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Typography, Tooltip, Grid2 as Grid } from "@mui/material";
import { DataGrid, GridOverlay, GridActionsCellItem } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { getTradeOffers } from "@/api/trade";
import { getDateString } from "@/utils/format";
import useTradeStore from "@/data/store/trade";
import useSnackbar from "@/data/store/snackbar";
import OfferAcceptConfirm from "./widgets/OfferAcceptConfirm";
import OfferCancelConfirm from "./widgets/OfferCancelConfirm";
import OfferRejectConfirm from "./widgets/OfferRejectConfirm";
import RarityWidget from "@/components/items/widgets/RarityWidget";

import type { Rarity } from "@/types/items";
import type { TradeOffer } from "@/types/trade";

export default function TradingPostOffers() {
  const router = useRouter();
  const refresh = useTradeStore((s) => s.refresh);
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [pendingOffers, setPendingOffers] = useState<TradeOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [offer, setOffer] = useState<TradeOffer | null>(null);

  useEffect(() => {
    getTradeOffers()
      .then((response) => {
        setPendingOffers(response.data);
      })
      .catch((error) => snackbar(error.response.data.message, "error"))
      .finally(() => setLoading(false));
  }, [refresh, snackbar]);

  const getRowRarityWidget = (params: GridRenderCellParams<any, Rarity>) => {
    return <RarityWidget rarity={params.row.item.rarity} />;
  };
  const formatDateString = (data: any) => {
    debugger; //wtf is this type?
    let val = getDateString(new Date(data.value));
    return val;
  };
  const getOfferDirectionText = (value: TradeOffer) => {
    if (value.direction === "in") return "Offer";
    else if (value.direction === "out") return "My Proposal";
    return "";
  };

  const getItem = (x: any) => {
    return (
      <Typography
        variant="body2"
        sx={{ cursor: "pointer" }}
        onClick={() => router.push(`/magicitem/${x.uuid}`)}
      >
        {`${x.name} (${x.owner_name})`}
      </Typography>
    );
  };

  const getMyItem = (p: any) => {
    if (p.row.direction === "in") return getItem(p.row.advert.item);
    else if (p.row.direction === "out") return getItem(p.row.item);
    return null;
  };
  const getTheirItem = (p: any) => {
    if (p.row.direction === "in") return getItem(p.row.item);
    else if (p.row.direction === "out") return getItem(p.row.advert.item);
    return null;
  };

  const acceptOffer = (offer: TradeOffer) => {
    setOffer(offer);
    setShowAccept(true);
  };
  const rejectOffer = (offer: TradeOffer) => {
    setOffer(offer);
    setShowReject(true);
  };
  const cancelOffer = (offer: TradeOffer) => {
    setOffer(offer);
    setShowCancel(true);
  };

  const getRowActions = (p: GridRenderCellParams) => {
    if (p.row.direction === "in") {
      return [
        <Tooltip title="Accept offer" placement="left">
          <GridActionsCellItem
            label="Accept Offer"
            onClick={() => acceptOffer(p.row.data)}
            icon={<CheckCircleIcon sx={{ color: "darkgreen" }} />}
          />
        </Tooltip>,
        <Tooltip title="Reject offer" placement="right">
          <GridActionsCellItem
            label="Reject Offer"
            onClick={() => rejectOffer(p.row.data)}
            icon={<CancelIcon sx={{ color: "darkred" }} />}
          />
        </Tooltip>,
      ];
    } else if (p.row.direction === "out") {
      return [
        <Tooltip title="Rescind offer" placement="right">
          <GridActionsCellItem
            label="Rescind offer"
            onClick={() => cancelOffer(p.row.data)}
            icon={<CancelIcon sx={{ color: "darkred" }} />}
          />
        </Tooltip>,
      ];
    }
  };

  const columns: GridColDef[] = [
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
      valueGetter: getOfferDirectionText,
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
      renderCell: getRowActions,
    },
  ];

  return (
    <React.Fragment>
      <Grid container sx={{ margin: "0.4em", height: "100%" }} spacing={2}>
        <DataGrid
          rows={pendingOffers}
          getRowId={(r) => r.uuid}
          columns={columns}
          loading={loading}
          sx={{ height: "calc(100% - 3em)" }}
          slots={{
            noRowsOverlay: () => (
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
      <OfferAcceptConfirm
        open={showAccept}
        onClose={() => setShowAccept(false)}
        {...offer}
      />
      <OfferCancelConfirm
        open={showCancel}
        onClose={() => setShowCancel(false)}
        {...offer}
      />
    </React.Fragment>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Typography, Tooltip, Box } from "@mui/material";
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
import type { TradeOffer, TradeOfferDirection } from "@/types/trade";

export default function TradingPostOffers() {
  const router = useRouter();
  const refresh = useTradeStore((s) => s.refresh);
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [pendingOffers, setPendingOffers] = useState<TradeOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAcceptOffer, setShowAcceptOffer] = useState<TradeOffer>();
  const [showRejectOffer, setShowRejectOffer] = useState<TradeOffer>();
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
    return (
      <Box className="w-full flex justify-center">
        <RarityWidget rarity={params.row.item.rarity} />
      </Box>
    );
  };
  const formatDateString = (data: string) => {
    let val = getDateString(new Date(data));
    return val;
  };
  const getOfferDirectionText = (direction: TradeOfferDirection) => {
    if (direction === "in") return "Offer";
    else if (direction === "out") return "My Proposal";
    return "";
  };

  const getItem = (x: any) => {
    return (
      <Box className="flex items-center h-full">
        <Typography
          variant="body2"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`/magicitem/${x.uuid}`)}
        >
          {`${x.name} (${x.owner_name})`}
        </Typography>
      </Box>
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

  const cancelOffer = (offer: TradeOffer) => {
    setOffer(offer);
    setShowCancel(true);
  };

  const getRowActions = (p: GridRenderCellParams) => {
    if (p.row.direction === "in") {
      return [
        <Tooltip title="Accept offer" placement="left" key={1}>
          <GridActionsCellItem
            label="Accept Offer"
            onClick={() => setShowAcceptOffer(p.row)}
            icon={<CheckCircleIcon sx={{ color: "darkgreen" }} />}
          />
        </Tooltip>,
        <Tooltip title="Reject offer" placement="right" key={2}>
          <GridActionsCellItem
            label="Reject Offer"
            onClick={() => setShowRejectOffer(p.row)}
            icon={<CancelIcon sx={{ color: "darkred" }} />}
          />
        </Tooltip>,
      ];
    } else if (p.row.direction === "out") {
      return [
        <Tooltip title="Rescind offer" placement="right" key={3}>
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
      flex: 1,
    },
    {
      field: "rarity",
      headerName: "Rarity",
      align: "center",
      renderCell: getRowRarityWidget,
      flex: 0.4,
    },
    {
      field: "direction",
      headerName: "Offer Type",
      valueGetter: getOfferDirectionText,
      flex: 1,
    },
    {
      headerName: "My item",
      field: "item",
      renderCell: getMyItem,
      flex: 2,
    },
    {
      headerName: "Their item",
      field: "item.name",
      renderCell: getTheirItem,
      flex: 2,
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
      <Box
        className="p-2"
        sx={{ height: "calc(100vh - 9em)", minHeight: "500px" }}
      >
        <DataGrid
          autoPageSize
          rows={pendingOffers}
          getRowId={(r) => r.uuid}
          columns={columns}
          loading={loading}
          density="compact"
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
      </Box>
      <OfferRejectConfirm
        open={!!showRejectOffer}
        onClose={() => setShowRejectOffer(undefined)}
        offer={showRejectOffer}
      />
      <OfferAcceptConfirm
        open={!!showAcceptOffer}
        onClose={() => setShowAcceptOffer(undefined)}
        offer={showAcceptOffer}
      />
      <OfferCancelConfirm
        open={showCancel}
        onClose={() => setShowCancel(false)}
        {...offer}
      />
    </React.Fragment>
  );
}

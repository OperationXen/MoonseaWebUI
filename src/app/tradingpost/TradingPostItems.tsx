import React, { useState, useEffect } from "react";

import { Grid2 } from "@mui/material";

import TradeAdvert from "./TradeAdvert";
import { getUserAdverts } from "@/api/trade";
import useTradeStore from "@/datastore/trade";
import useSnackbar from "@/datastore/snackbar";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";

import type { Advert } from "@/types/trade";

export default function TradingPostItems() {
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [adverts, setAdverts] = useTradeStore((s) => [s.adverts, s.setAdverts]);
  const [loading, setLoading] = useState(true);
  const refreshAdverts = useTradeStore((s) => s.refresh);

  useEffect(() => {
    getUserAdverts()
      .then((response) => {
        setAdverts(response.data);
      })
      .catch((error) => snackbar(error.response.data.message, "error"))
      .finally(() => setLoading(false));
  }, [refreshAdverts, setAdverts, snackbar]);

  if (loading) {
    return <LoadingOverlay open={loading} />;
  } else if (adverts && adverts.length) {
    return (
      <Grid2 container sx={{ margin: "0.4em" }} spacing={2}>
        {adverts.map((advert: Advert) => {
          return (
            <Grid2>
              <TradeAdvert {...advert} />
            </Grid2>
          );
        })}
      </Grid2>
    );
  } else {
    return <EmptyAdvertsWidget />;
  }
}

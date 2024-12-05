import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import TradeAdvert from "./TradeAdvert";
import { getUserAdverts } from "@/api/trade";
import useTradeStore from "@/datastore/trade";
import useSnackbar from "@/datastore/snackbar";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";

export default function TradingPostItems(props) {
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
    return <LoadingOverlay show={loading} />;
  } else if (adverts && adverts.length) {
    return (
      <Grid container sx={{ margin: "0.4em" }} spacing={2}>
        {adverts.map((advert) => {
          return (
            <Grid md={6} lg={4} xs={12}>
              <TradeAdvert {...advert} />
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return <EmptyAdvertsWidget />;
  }
}

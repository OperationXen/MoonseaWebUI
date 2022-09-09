import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";
import useTradeStore from "../../datastore/trade";
import { getUserAdverts } from "../../api/trade";
import TradeAdvert from "./TradeAdvert";
import LoadingOverlay from "../general/LoadingOverlay";

export default function TradingPostItems(props) {
  const [adverts, setAdverts] = useTradeStore((s) => [s.adverts, s.setAdverts]);
  const [loading, setLoading] = useState(true);
  const refreshAdverts = useTradeStore((s) => s.refresh);

  useEffect(() => {
    getUserAdverts()
      .then((response) => {
        setAdverts(response.data);
      })
      .finally(() => setLoading(false));
  }, [refreshAdverts, setAdverts]);

  if (adverts && adverts.length) {
    return (
      <Grid container sx={{ margin: "0.4em" }} spacing={2}>
        <LoadingOverlay show={loading} />
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

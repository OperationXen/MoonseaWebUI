import React, { useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import EmptyAdvertsWidget from "./widgets/EmptyAdvertsWidget";
import useTradeStore from "../../datastore/trade";
import { getUserAdverts } from "../../api/trade";
import TradeAdvert from "./TradeAdvert";

export default function TradingPostItems(props) {
  const [adverts, setAdverts] = useTradeStore((s) => [s.adverts, s.setAdverts]);
  const refreshAdverts = useTradeStore((s) => s.refresh);

  useEffect(() => {
    getUserAdverts().then((response) => {
      setAdverts(response.data);
    });
  }, [refreshAdverts, setAdverts]);

  if (adverts && adverts.length) {
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

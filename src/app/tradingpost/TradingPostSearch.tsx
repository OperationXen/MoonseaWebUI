import React, { useState, useEffect, useCallback } from "react";

import { Grid2 as Grid } from "@mui/material";

import { searchAdverts } from "@/api/trade";
import TradeAdvert from "./TradeAdvert";
import useSnackbar from "@/datastore/snackbar";
import LoadingOverlay from "@/components/general/LoadingOverlay";

import type { Advert } from "@/types/trade";

type PropsType = {
  filter: string;
};

export default function TradingPostSearch(props: PropsType) {
  const { filter } = props;

  const snackbar = useSnackbar((s) => s.displayMessage);

  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback(() => {
    searchAdverts(filter)
      .then((response) => setAdverts(response.data))
      .catch((error) => snackbar(error.response.data.message, "error"))
      .finally(() => setLoading(false));
  }, [filter, snackbar]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <Grid container sx={{ margin: "0.4em", width: "100%" }} spacing={2}>
      <LoadingOverlay open={loading} />
      {adverts.map((advert) => {
        return (
          <Grid>
            <TradeAdvert {...advert} key={advert.uuid} market={true} />
          </Grid>
        );
      })}
    </Grid>
  );
}

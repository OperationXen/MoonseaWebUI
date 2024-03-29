import React, { useState, useEffect, useCallback } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import { searchAdverts } from "../../api/trade";
import TradeAdvert from "./TradeAdvert";
import useSnackbar from "../../datastore/snackbar";
import LoadingOverlay from "../general/LoadingOverlay";

export default function TradingPostSearch(props) {
  const { filter } = props;
  const snackbar = useSnackbar((s) => s.displayMessage);

  const [adverts, setAdverts] = useState([]);
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
      <LoadingOverlay show={loading} />
      {adverts.map((advert) => {
        return (
          <Grid md={6} lg={4} xs={12}>
            <TradeAdvert {...advert} key={advert.uuid} market={true} />
          </Grid>
        );
      })}
    </Grid>
  );
}

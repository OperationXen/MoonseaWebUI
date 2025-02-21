import React, { useState, useEffect, useCallback } from "react";

import { Box } from "@mui/material";

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
    <Box className="flex flex-wrap flex-row p-2 gap-2 items-center justify-evenly h-full">
      <LoadingOverlay open={loading} />
      {adverts.map((advert) => {
        return <TradeAdvert {...advert} key={advert.uuid} market={true} />;
      })}
    </Box>
  );
}

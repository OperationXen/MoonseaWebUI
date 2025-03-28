import { Box } from "@mui/material";

import TradeAdvert from "./TradeAdvert";
import { useTradingPostSearch } from "@/data/fetch/tradingpost/search";
import LoadingOverlay from "@/components/general/LoadingOverlay";

type PropsType = {
  filter: string;
};

export default function TradingPostSearch(props: PropsType) {
  const { filter } = props;

  const { data: searchResults, isLoading } = useTradingPostSearch(filter);

  return (
    <Box className="flex flex-wrap flex-row p-2 gap-2 items-center justify-evenly h-full">
      <LoadingOverlay open={isLoading} />
      {searchResults?.map((advert) => {
        return <TradeAdvert {...advert} key={advert.uuid} market={true} />;
      })}
    </Box>
  );
}

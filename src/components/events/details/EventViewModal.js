import { Dialog, Typography, Divider, Box } from "@mui/material";

import { EventDetailsSpellbookUpdate } from "./EventDetailsSpellbookUpdate";
import { EventDetailsMundaneTrade } from "./EventDetailsMundaneTrade";
import { EventDetailsCatchingUp } from "./EventDetailsCatchingUp";
import { EventDetailsDMReward } from "./EventDetailsDMReward";
import { EventDetailsGame } from "./EventDetailsGame";
import { getDateString } from "@/utils/format";
import { getEventName } from "@/utils/events";

export function EventViewModal(props) {
  const { data, setData } = props;

  const handleClose = () => {
    setData(null);
  };

  const getEventDetails = () => {
    switch (data?.event_type) {
      case "game":
        return <EventDetailsGame data={data} />;
      case "dm_reward":
        return <EventDetailsDMReward data={data} />;
      case "dt_mtrade":
        return <EventDetailsMundaneTrade data={data} />;
      case "dt_catchingup":
        return <EventDetailsCatchingUp data={data} />;
      case "dt_sbookupd":
        return <EventDetailsSpellbookUpdate data={data} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={data !== null}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40em",
          border: "2px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px black",
          padding: "1.2em",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" marginLeft="0.4em">
          {getEventName(data)}
        </Typography>
        <Typography variant="h5" marginRight="0.4em">
          {getDateString(data?.datetime)}
        </Typography>
      </Box>
      <Divider variant="middle" />
      {getEventDetails()}
    </Dialog>
  );
}

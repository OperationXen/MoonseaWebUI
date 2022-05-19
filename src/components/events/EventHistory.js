import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { getEventsForCharacter } from "../../api/events.js";

export default function EventHistory(props) {
  const { characterID } = props;

  const [events, setEvents] = useState([
    {
      id: 0,
      col1: "Downtime Activity",
      col2: "2022/05/19",
      col3: "Catching up, exchanged 10 downtime days for 1 level",
    },
    {
      id: 1,
      col1: "Game",
      col2: "2022/05/17",
      col3: "Module CCC-PDXAGE-02-01 The Dark Hunt. Gained 200GP",
    },
    {
      id: 2,
      col1: "DM Service Reward",
      col2: "2022/05/04",
      col3: "Exchanged 10 hours service for 2500gp, tier 2 item: Bracers of defence",
    },
    {
      id: 3,
      col1: "Shopping",
      col2: "2022/05/04",
      col3: "Purchased chest, crowbar, bell, book, candle for 5gp, 4sp",
    },
  ]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getEventsForCharacter(characterID, pageSize, pageSize * (pageNum - 1)).then(
      (result) => {
        setEvents(result.data);
      }
    );
  }, [characterID, pageNum, pageSize]);

  const columns = [
    { field: "col1", headerName: "Event", flex: 0.2 },
    { field: "col2", headerName: "Date", flex: 0.15 },
    { field: "col3", headerName: "Details", flex: 0.6 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={events}
      rowHeight={36}
      sx={{ border: "1px solid black" }}
    />
  );
}

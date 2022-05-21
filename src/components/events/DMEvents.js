import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { getEventsForCharacter } from "../../api/events.js";

export default function DMEvents(props) {
  const { characterID } = props;

  const [events, setEvents] = useState([
    {
      id: 0,
      col1: "Claimed Service Reward",
      col2: -10,
      col3: "2022/05/04",
      col4: "Periapt of health",
    },
    {
      id: 1,
      col1: "DMed Game",
      col2: 12,
      col3: "2022/05/03",
      col4: "DDAL0505 - Best served cold, mentoring, streamed",
    },
    {
      id: 2,
      col1: "DMed Game",
      col2: 10,
      col3: "2022/05/02",
      col4: "DDAL0505 - Best served cold, mentoring, streamed",
    },
    {
      id: 3,
      col1: "DMed Game",
      col2: 10,
      col3: "2022/05/01",
      col4: "DDAL0505 - Best served cold, mentoring, streamed",
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
    { field: "col2", headerName: "Service Hours", flex: 0.1 },
    { field: "col3", headerName: "Date", flex: 0.15 },
    { field: "col4", headerName: "Details", flex: 0.6 },
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
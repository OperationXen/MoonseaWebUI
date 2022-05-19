import { useState } from "react";

import { Paper, Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

import MagicItemList from "./MagicItemList";

export default function ItemSidebar(props) {
  const { itemData } = props;
  const [itemTab, setItemTab] = useState(0);

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <TabContext value={itemTab}>
        <Tabs
          value={itemTab}
          onChange={(e, n) => setItemTab(n)}
          aria-label="item categories"
          centered
          sx={{
            padding: "0 0.2em",
            borderBottom: "1px solid black",
          }}
        >
          <Tab label="Magic Items" value={0} />
          <Tab label="Consumables" value={1} />
          <Tab label="Common" value={2} />
        </Tabs>
        <TabPanel value={0}>
          <MagicItemList magicItems={itemData.equipped_items} />
        </TabPanel>
        <TabPanel value={1}>Consumables</TabPanel>
        <TabPanel value={2}>Common items</TabPanel>
      </TabContext>
    </Paper>
  );
}

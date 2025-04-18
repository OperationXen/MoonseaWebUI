import { useState } from "react";

import { Paper, Tabs, Tab } from "@mui/material";
import { TabContext } from "@mui/lab";

import AdventuringGearGrid from "./adventuringgear/AdventuringGearGrid";
import ConsumableItemsGrid from "./consumables/ConsumableItemsGrid";
import CommonItemsGrid from "./commonitems/CommonItemsGrid";
import MagicItemsGrid from "./magicitems/MagicItemsGrid";

import type { Character } from "@/types/character";

type PropsType = {
  data: Character;
};

export function ItemPane(props: PropsType) {
  const { data: character } = props;

  const [itemTab, setItemTab] = useState("magicitems");

  return (
    <Paper elevation={8} className="flex flex-col flex-grow">
      <TabContext value={itemTab}>
        <Tabs
          value={itemTab}
          onChange={(_e, n) => setItemTab(n)}
          aria-label="item categories"
          centered
          sx={{
            padding: "0 0.2em",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <Tab label="Magic Items" value={"magicitems"} />
          <Tab label="Common Items" value={"commonitems"} />
          <Tab label="Consumables" value={"consumables"} />
          {/* <Tab label="Adventuring Gear" value={"adventuringgear"} /> */}
        </Tabs>

        {itemTab === "magicitems" && (
          <MagicItemsGrid
            characterUUID={character.uuid}
            editable={character.editable}
          />
        )}
        {itemTab === "commonitems" && (
          <CommonItemsGrid
            characterUUID={character.uuid}
            editable={character.editable}
          />
        )}
        {itemTab === "consumables" && (
          <ConsumableItemsGrid
            characterUUID={character.uuid}
            editable={character.editable}
          />
        )}
        {itemTab === "adventuringgear" && (
          <AdventuringGearGrid
            characterUUID={character.uuid}
            editable={character.editable}
          />
        )}
      </TabContext>
    </Paper>
  );
}

export default ItemPane;
